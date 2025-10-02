import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
from dataclasses import dataclass
import os

FAIRNESS_MODE = "equal_intensity"
TAU_LIST = [10, 15, 30, 50]
INCLUDE_ON = True
TAU_REF_FOR_EQUAL_TOTAL = 15
SAVE_PREFIX = "ft_compare"

plt.rcParams.update({
    "font.size": 20,
    "axes.labelsize": 22,
    "xtick.labelsize": 20,
    "ytick.labelsize": 20,
    "legend.fontsize": 18,
    "axes.linewidth": 2.0,
})

BASE_DIR = os.path.dirname(__file__)
OUT_DIR = os.path.join(BASE_DIR, "ft_compare_promoters_figures")
FIG_COUNT = 1

def _sanitize_title(title: str) -> str:
    illegal = [":", "/", "\\", "*", "?", "\"", "<", ">", "|"]
    for ch in illegal:
        title = title.replace(ch, "-")
    return title

def save_figure(fig, title: str):
    global FIG_COUNT
    os.makedirs(OUT_DIR, exist_ok=True)
    filename = f"Figure{FIG_COUNT}. {_sanitize_title(title)}.png"
    out_path = os.path.join(OUT_DIR, filename)
    fig.savefig(out_path, dpi=300, bbox_inches="tight")
    plt.close(fig)
    FIG_COUNT += 1
    return out_path

@dataclass
class Params:
    Tcc_min: float = 87.0
    t_end_min: float = 180.0
    dt_min: float = 0.2

    pulse_mode: str = "pulse"
    pulse_width_min: float = 15.0
    pulse_amp: float = 1.0

    k_tx: float = 1.0
    k_dm: float = np.log(2)/10.0
    k_tl: float = 0.5

    tau_B_min: float = 12.0
    tau_I_min: float = 45.0
    tau_R_min: float = 720.0

    t12_R_hours: float = 16.0

    inherit_frac: float = 0.2

    @property
    def k_B(self): return 1.0/self.tau_B_min
    @property
    def k_I(self): return 1.0/self.tau_I_min
    @property
    def k_R(self): return 1.0/self.tau_R_min
    @property
    def k_D(self): return np.log(2)/(self.t12_R_hours*60.0)

def u_input(t, p: Params):
    if p.pulse_mode == "const":
        return p.pulse_amp
    return p.pulse_amp if (0.0 <= t < p.pulse_width_min) else 0.0

def f_rhs(t, y, p: Params):
    m, C, B, I, R = y
    u = u_input(t, p)
    dm = p.k_tx*u - p.k_dm*m
    dC = p.k_tl*m - p.k_B*C
    dB = p.k_B*C - p.k_I*B
    dI = p.k_I*B - p.k_R*I
    dR = p.k_R*I - p.k_D*R
    return np.array([dm, dC, dB, dI, dR], dtype=float)

def rk4_step(t, y, h, p: Params):
    k1 = f_rhs(t, y, p)
    k2 = f_rhs(t + 0.5*h, y + 0.5*h*k1, p)
    k3 = f_rhs(t + 0.5*h, y + 0.5*h*k2, p)
    k4 = f_rhs(t + h,     y + h*k3, p)
    return y + (h/6.0)*(k1 + 2*k2 + 2*k3 + k4)

def simulate_single_cell(p: Params, y0=None, t_end_min=None):
    if t_end_min is None: t_end_min = p.t_end_min
    h = p.dt_min
    t = np.arange(0.0, t_end_min+h*0.5, h)
    y = np.zeros((t.size, 5), dtype=float)
    if y0 is not None:
        y[0] = y0
    for i in range(t.size-1):
        y[i+1] = rk4_step(t[i], y[i], h, p)

    m, C, B, I, R = [y[:,k] for k in range(5)]
    r = R / np.maximum(B+R, 1e-12)
    out = dict(m=m, C=C, B=B, I=I, R=R, r=r, y=y)
    return t, out

def window_index(t, t1, t2):
    i1 = np.argmin(np.abs(t - t1))
    i2 = np.argmin(np.abs(t - t2))
    if i2 < i1: i1, i2 = i2, i1
    return i1, i2

def metrics_delta_r_and_monotonicity(t, r, t1=10.0, t2=90.0):
    i1, i2 = window_index(t, t1, t2)
    delta_r = r[i2] - r[i1]
    drdt = np.gradient(r, t)
    min_slope = drdt[i1:i2+1].min()
    pos_frac  = (drdt[i1:i2+1] > 0).mean()
    return delta_r, min_slope, pos_frac

def simulate_lineage_birth_aligned(p: Params, generations=8):
    h = p.dt_min
    t_line = np.arange(0.0, p.Tcc_min + h*0.5, h)
    nT = t_line.size
    Rmat = np.zeros((generations, nT))
    Bmat = np.zeros((generations, nT))
    rmat = np.zeros((generations, nT))
    rmat_baseline = np.zeros((generations, nT))
    R0_list = []

    R_inherit = 0.0
    for g in range(generations):
        y0 = np.array([0,0,0,0,R_inherit], dtype=float)
        t, out = simulate_single_cell(p, y0=y0, t_end_min=p.Tcc_min)
        R = out["R"]; B = out["B"]; r = out["r"]
        R0 = R[0]
        R0_list.append(R0)

        denom = np.maximum(B + R - R0, 1e-12)
        r_base = np.clip((R - R0)/denom, 0.0, 1.0)

        Rmat[g,:] = R
        Bmat[g,:] = B
        rmat[g,:] = r
        rmat_baseline[g,:] = r_base

        R_end = R[-1]
        R_inherit = p.inherit_frac * R_end

    return t_line, Rmat, Bmat, rmat, rmat_baseline, R0_list

def simulate_chain_absolute_time(p: Params, generations=4):
    t_abs_list, r_list, rprime_list = [], [], []
    R_inherit = 0.0
    t0 = 0.0
    for g in range(generations+1):
        y0 = np.array([0,0,0,0,R_inherit], dtype=float)
        t, out = simulate_single_cell(p, y0=y0, t_end_min=p.Tcc_min)
        R = out["R"]; B = out["B"]; r = out["r"]
        R0 = R[0]
        rprime = np.clip((R - R0)/np.maximum(B+R-R0, 1e-12), 0.0, 1.0)

        t_abs = t + t0
        t_abs_list.append(t_abs)
        r_list.append(r)
        rprime_list.append(rprime)

        R_inherit = p.inherit_frac * R[-1]
        t0 += p.Tcc_min

    return t_abs_list, r_list, rprime_list

def set_amp_for_mode(p: Params, tau_value, base_amp=1.0, fairness=FAIRNESS_MODE):
    if tau_value == "ON":
        mode = "const"
        if fairness == "equal_intensity":
            amp = base_amp
        else:
            amp = base_amp * (TAU_REF_FOR_EQUAL_TOTAL / 90.0)
        return mode, None, amp

    mode = "pulse"
    if fairness == "equal_intensity":
        amp = base_amp
    else:
        amp = base_amp * (TAU_REF_FOR_EQUAL_TOTAL / float(tau_value))
    return mode, float(tau_value), amp

def main():
    p = Params()

    rows = []
    all_labels = [str(x) for x in TAU_LIST] + (["ON"] if INCLUDE_ON else [])
    x_pos = np.arange(len(all_labels))
    delta_vals, min_slope_vals, pos_frac_vals = [], [], []

    colors = plt.cm.tab10(np.linspace(0,1,len(all_labels)))

    plt.figure(figsize=(8,5))
    for idx, label in enumerate(all_labels):
        tau_value = "ON" if label=="ON" else float(label)
        mode, tau_eff, amp = set_amp_for_mode(p, tau_value, base_amp=1.0, fairness=FAIRNESS_MODE)
        p.pulse_mode = mode
        if tau_eff is not None: p.pulse_width_min = tau_eff
        p.pulse_amp = amp
        p.t_end_min = 120.0

        t, out = simulate_single_cell(p)
        r = out["r"]
        delta_r, min_slope, pos_frac = metrics_delta_r_and_monotonicity(t, r, 10.0, 90.0)

        rows.append(dict(mode=mode, tau=tau_eff if tau_eff is not None else np.inf,
                         label=label, fairness=FAIRNESS_MODE,
                         delta_r=delta_r, min_slope=min_slope, pos_frac=pos_frac, amp=amp))
        delta_vals.append(delta_r); min_slope_vals.append(min_slope); pos_frac_vals.append(pos_frac)

        plt.plot(t, r, label=f"{label}", lw=1.8, alpha=0.95, color=colors[idx])

    plt.xlabel("Time since birth (min)")
    plt.ylabel("r = R/(B+R)")
    plt.legend(ncol=3, frameon=False)
    ax = plt.gca()
    ax.tick_params(axis='both', labelsize=20, width=2.0, length=8)
    for s in ax.spines.values():
        s.set_linewidth(2.0)
    plt.tight_layout()
    save_figure(plt.gcf(), f"rt(t) overlay (fairness: {FAIRNESS_MODE})")

    fig, ax = plt.subplots(figsize=(7,5))
    ax.plot(x_pos, delta_vals, marker="o")
    ax.set_xticks(x_pos); ax.set_xticklabels(all_labels)
    ax.set_xlabel("Pulse width τ (min) / ON")
    ax.set_ylabel("Delta r = r(90) - r(10)")
    ax.axhline(0.09, ls="--", lw=1.6, color="gray", alpha=0.8)
    ax.text(x_pos[-1]-0.2, 0.09+0.002, "3σ≈0.09", color="gray", fontsize=18,
            ha='right', va='bottom')
    ax.tick_params(axis='both', labelsize=20, width=2.0, length=8)
    for s in ax.spines.values():
        s.set_linewidth(2.0)
    plt.tight_layout()
    save_figure(fig, f"Delta r vs τ (10-90 min window)")

    df = pd.DataFrame(rows)
    df = df[["label","mode","tau","amp","delta_r","min_slope","pos_frac","fairness"]]
    df_sorted = df.copy()
    df_sorted = df_sorted.sort_values(by=["tau"])
    print("\n=== Metrics table (10�C90 min window) ===")
    print(df_sorted.to_string(index=False))
    df_sorted.to_csv(f"{SAVE_PREFIX}_metrics_{FAIRNESS_MODE}.csv", index=False)

    reps = []
    rep_good = 12 if 12 in TAU_LIST else (15 if 15 in TAU_LIST else TAU_LIST[0])
    reps.append(("pulse", rep_good))
    if 50 in TAU_LIST:
        reps.append(("pulse", 50))
    else:
        reps.append(("pulse", TAU_LIST[-1]))
    if INCLUDE_ON:
        reps.append(("const", None))

    for mode, tau_eff in reps:
        p.pulse_mode = mode
        if tau_eff is not None: p.pulse_width_min = tau_eff
        _, _, amp = set_amp_for_mode(p, "ON" if mode=="const" else tau_eff, base_amp=1.0, fairness=FAIRNESS_MODE)
        p.pulse_amp = amp

        t_line, Rmat, Bmat, rmat, rbase, R0_list = simulate_lineage_birth_aligned(p, generations=8)

        plt.figure(figsize=(8,5))
        im = plt.imshow(rmat, aspect="auto", origin="lower",
                        extent=[t_line[0], t_line[-1], 0, rmat.shape[0]],
                        cmap="viridis")
        plt.colorbar(im, label="r value")
        plt.xlabel("Time since birth (min)")
        plt.ylabel("Generation index")
        ax = plt.gca()
        ax.tick_params(axis='both', labelsize=20, width=2.0, length=8)
        for s in ax.spines.values():
            s.set_linewidth(2.0)
        tag = "on" if mode=="const" else f"τ{int(tau_eff)}"
        title_r = f"Lineage r heatmap - {tag} - fairness {FAIRNESS_MODE}"
        plt.title(title_r, fontsize=14)
        plt.tight_layout()
        save_figure(plt.gcf(), title_r)

        plt.figure(figsize=(8,5))
        im = plt.imshow(rbase, aspect="auto", origin="lower",
                        extent=[t_line[0], t_line[-1], 0, rbase.shape[0]],
                        cmap="viridis")
        plt.colorbar(im, label="r' value")
        plt.xlabel("Time since birth (min)")
        plt.ylabel("Generation index")
        ax = plt.gca()
        ax.tick_params(axis='both', labelsize=20, width=2.0, length=8)
        for s in ax.spines.values():
            s.set_linewidth(2.0)
        title_rp = f"Lineage rprime heatmap - {tag} - fairness {FAIRNESS_MODE}"
        plt.title(title_rp, fontsize=14)
        plt.tight_layout()
        save_figure(plt.gcf(), title_rp)

    cases = [("pulse", rep_good), ("const", None)]
    plt.figure(figsize=(9,5))
    for mode, tau_eff in cases:
        p.pulse_mode = mode
        if tau_eff is not None: p.pulse_width_min = tau_eff
        _, _, amp = set_amp_for_mode(p, "ON" if mode=="const" else tau_eff, base_amp=1.0, fairness=FAIRNESS_MODE)
        p.pulse_amp = amp
        t_abs_list, r_list, rprime_list = simulate_chain_absolute_time(p, generations=4)

        for g, (tt, rp) in enumerate(zip(t_abs_list, rprime_list)):
            lbl = f"{'ON' if mode=='const' else f'τ={tau_eff}'} - G{g}"
            plt.plot(tt, rp, lw=1.6, label=lbl, alpha=0.9)

    plt.xlabel("Absolute time (min)")
    plt.ylabel("r' (baseline-corrected)")
    plt.legend(ncol=2, frameon=False)
    ax = plt.gca()
    ax.tick_params(axis='both', labelsize=20, width=2.0, length=8)
    for s in ax.spines.values():
        s.set_linewidth(2.0)
    plt.tight_layout()
    save_figure(plt.gcf(), f"Four-generation rprime chains - fairness {FAIRNESS_MODE}")

    print("\nSaved figures (single folder):")
    print(f"- {OUT_DIR}")

if __name__ == "__main__":
    main()
