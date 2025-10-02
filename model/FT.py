import numpy as np
import matplotlib.pyplot as plt
import os
from dataclasses import dataclass
from math import log
from typing import Tuple, Dict, List

                                                 
def ln2() -> float:
    """Return natural logarithm of 2"""
    return log(2.0)

                                 
plt.rcParams.update({
    "font.size": 20,
    "axes.labelsize": 22,
    "xtick.labelsize": 20,
    "ytick.labelsize": 20,
    "legend.fontsize": 18,
    "axes.linewidth": 2.0,
})

                                                               
BASE_DIR = os.path.dirname(__file__)
OUT_DIR = os.path.join(BASE_DIR, "FT_v3.0_figures")
FIG_COUNT = 1

def _sanitize_title(title: str) -> str:
    illegal = [":", "/", "\\", "*", "?", "\"", "<", ">", "|"]
    for ch in illegal:
        title = title.replace(ch, "-")
    return title

def save_figure(fig, title: str):
    """Save figure as 'Figurex. title.png' into the per-script folder."""
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
    t_end_min: float = 20160.0                                                                                
    dt_min: float = 1.0                                                                        

                                                              
    pulse_width_min: float = 15.0                                                               
    pulse_amp: float = 1.0                                   
    pulse_start_offset: float = 57.0                                                             

                   
    k_dm: float = ln2() / 10.0                                                    

                                       
                                                                               
                                                          
                                                 

                                                                      
    tau_B_invitro_min: float = 12.0
    tau_I_invitro_min: float = 45.0
    tau_R_invitro_min: float = 720.0

                                                                            
    tau_B_invivo_min: float = 4.0 * 60.0                   
    tau_I_invivo_min: float = 8.0 * 60.0                  
    tau_R_invivo_min: float = 18.0 * 60.0                  

                                                                                       
    t12_R_hours: float = 30.0                                         

                                                              
    inherit_frac_C: float = 1.0                                                                            

                                                       
    temperature_celsius: float = 30.0                                            
    medium_ph: float = 6.25                                                        

                                                   
    v0: float = 2.0                                                     
    growth_rate: float = 0.0                                  
    division_volume_ratio: float = 2.0                            

                                                
    crowding_threshold: float = 50.0                      
    crowding_strength: float = 0.2                       

                   
    save_prefix: str = "ft_model_v2_corrected"

                            
    @property
    def k_B(self) -> float:
        return 1.0 / max(self.tau_B_invivo_min, 1e-9)                                               
    
    @property
    def k_I(self) -> float:
        return 1.0 / max(self.tau_I_invivo_min, 1e-9)                                               
    
    @property
    def k_R(self) -> float:
        return 1.0 / max(self.tau_R_invivo_min, 1e-9)                                               
    

    
    @property
    def k_DR(self) -> float:
        return ln2() / (self.t12_R_hours * 60.0)                                       

                                                        
def u_birth_pulse(t: float, width_min: float, amp: float, start_offset: float = 0.0, Tcc_min: float = 87.0) -> float:
    """
    ASH1 promoter pulse function: active during late cell cycle (Tcc - 30 min to Tcc - 15 min)
    Modified to reflect ASH1 expression timing at end of cell cycle before division
    """
                                  
    t_in_cycle = t % Tcc_min
    
                                                                                
    pulse_start = start_offset                                                     
    pulse_end = pulse_start + width_min
    
                                                           
    if pulse_end <= Tcc_min:
        return amp if pulse_start <= t_in_cycle < pulse_end else 0.0
    else:
                                          
        return amp if (t_in_cycle >= pulse_start) or (t_in_cycle < (pulse_end - Tcc_min)) else 0.0

def get_transcription_translation_rates(t: float, Tcc_min: float) -> Tuple[float, float]:
    """
    Get cell-cycle dependent transcription (k_tx) and translation (k_tl) rates
    based on time t (min) within the cell cycle.
    Updated to match ASH1 expression pattern in model document.
    """
                                  
    t_in_cycle = t % Tcc_min
    
    if t_in_cycle < 30.0:
                                                         
        k_tx = 0.2
        k_tl = 0.2
    elif 30.0 <= t_in_cycle < 40.0:
                                                              
        fraction = (t_in_cycle - 30.0) / 10.0
        k_tx = 0.2 + fraction * (0.8 - 0.2)
        k_tl = 0.2 + fraction * (0.8 - 0.2)
    elif 40.0 <= t_in_cycle < 55.0:
                                                               
        fraction = (t_in_cycle - 40.0) / 15.0
        k_tx = 0.8 + fraction * (1.2 - 0.8)
        k_tl = 0.8 + fraction * (1.2 - 0.8)
    elif 55.0 <= t_in_cycle < 72.0:
                                                                        
        k_tx = 1.2                                               
        k_tl = 1.2
    else:                             
                                                             
        k_tx = 0.1
        k_tl = 0.1
    
    return k_tx, k_tl

def crowding_correction(total_concentration: float, threshold: float, strength: float) -> float:
    """
    Calculate rate correction factor due to molecular crowding.
    Factor approaches (1-strength) as concentration becomes large.
    """
    if total_concentration <= threshold:
        return 1.0
    excess = total_concentration - threshold
    return 1.0 - strength * (1.0 - 1.0 / (1.0 + excess))

def cell_volume(t: float, t_division: float, p: Params) -> float:
    """
    Calculate cell volume at time t, considering volume growth and division events.
    t_division is the time since last division.
    """
                                                   
    return p.v0 * np.exp(p.growth_rate * t_division)

def rk4_step(f, t: float, y: np.ndarray, h: float, args=()) -> np.ndarray:
    """Runge-Kutta 4th order integration step with additional arguments"""
    k1 = f(t, y, *args)
    k2 = f(t + 0.5*h, y + 0.5*h*k1, *args)
    k3 = f(t + 0.5*h, y + 0.5*h*k2, *args)
    k4 = f(t + h, y + h*k3, *args)
    return y + (h/6.0)*(k1 + 2*k2 + 2*k3 + k4)

def simulate_single_cell(p: Params, C0_inherit: float = 0.0, include_decay: bool = True) -> Tuple[np.ndarray, Dict[str, np.ndarray]]:
    """
    Simulate single-cell dynamics of the C->B->I->R maturation chain using RK4 integration,
    including cell volume growth, division dilution, and molecular crowding effects.
    
    Args:
        p: Parameter object
        C0_inherit: Inherited C-state protein concentration
        include_decay: Whether to include protein degradation
    
    Returns:
        t: Time points
        output: Dictionary with concentrations, volume, and r ratio
    """
                       
    steps = int(np.ceil(p.t_end_min / p.dt_min))
    t = np.arange(steps + 1) * p.dt_min
    
                                                                                 
    initial_volume = p.v0
    y0 = np.array([0.0, C0_inherit, 0.0, 0.0, 0.0, initial_volume, 0.0])
    arr = np.zeros((steps + 1, 7))
    arr[0, :] = y0

                           
    def f(t: float, y: np.ndarray) -> np.ndarray:
        m, C, B, I, R, v, t_since_div = y
        
                                                                                         
        division_occurred = False
        if t_since_div >= p.Tcc_min or v >= p.v0 * p.division_volume_ratio:
                                                       
            m = m / 2.0
            C = C / 2.0
            B = B / 2.0
            I = I / 2.0
            R = R / 2.0
            v = p.v0                
            t_since_div = 0.0                        
            division_occurred = True
        
                                                             
        u = u_birth_pulse(t_since_div, p.pulse_width_min, p.pulse_amp, p.pulse_start_offset, p.Tcc_min)
        k_tx_base, k_tl_base = get_transcription_translation_rates(t_since_div, p.Tcc_min)
        
                                                           
        total_conc = m + C + B + I + R
        crowding_factor = crowding_correction(total_conc, p.crowding_threshold, p.crowding_strength)
        
                                            
        k_tx = k_tx_base * crowding_factor
        k_tl = k_tl_base * crowding_factor
        k_B = p.k_B * crowding_factor
        k_I = p.k_I * crowding_factor
        k_R = p.k_R * crowding_factor

                                                                                             
                                                              
        dm_dt_amount = k_tx * u - p.k_dm * m
        dm_dt = (dm_dt_amount / v) - (m / v) * (p.growth_rate * v)                           
        
        dC_dt_amount = k_tl * m - k_B * C
        dC_dt = (dC_dt_amount / v) - (C / v) * (p.growth_rate * v)
        
        dB_dt_amount = k_B * C - k_I * B
        dB_dt = (dB_dt_amount / v) - (B / v) * (p.growth_rate * v)
        
        dI_dt_amount = k_I * B - k_R * I
        dI_dt = (dI_dt_amount / v) - (I / v) * (p.growth_rate * v)
        
        dR_dt_amount = k_R * I
        if include_decay:
            dR_dt_amount -= p.k_DR * R
        dR_dt = (dR_dt_amount / v) - (R / v) * (p.growth_rate * v)
        
                            
        dv_dt = p.growth_rate * v
        
                                                    
        dt_since_div_dt = 1.0
        
        return np.array([dm_dt, dC_dt, dB_dt, dI_dt, dR_dt, dv_dt, dt_since_div_dt])

                         
    for i in range(steps):
        arr[i+1, :] = rk4_step(f, t[i], arr[i, :], p.dt_min)
                                            
        arr[i+1, :5] = np.maximum(arr[i+1, :5], 0.0)
                                                         
        arr[i+1, 5] = max(arr[i+1, 5], p.v0)

                     
    m, C, B, I, R, volume, t_since_div = arr.T
    r = R / (B + R + 1e-12)                          
    
    return t, {
        "mRNA": m, 
        "C": C, 
        "B": B, 
        "I": I, 
        "R": R, 
        "r": r,
        "volume": volume,
        "t_since_division": t_since_div
    }

                                                              
def lineage_matrix(p: Params, generations: int = 6, include_decay: bool = True) -> Tuple[np.ndarray, np.ndarray]:
    """
    Generate matrix of r(t) values for multiple generations, each row birth-aligned.
    
    Returns:
        mat: [generations x time_steps] matrix of r values
        trow: Time points for each generation
    """
                                                                            
                                                                    
    t_end = 48.0 * 60.0                       
    steps = int(np.ceil(t_end / p.dt_min))
    trow = np.arange(steps + 1) * p.dt_min
    C_inherit = 0.0                                            
    mat = []
    
    for _ in range(generations):
                                                
        original_t_end = p.t_end_min
        p.t_end_min = t_end
        
                                                       
        t, out = simulate_single_cell(p, C0_inherit=C_inherit, include_decay=include_decay)
        mat.append(out["r"])
        
                                                
        if t[-1] >= p.Tcc_min:
            C_T = float(np.interp(p.Tcc_min, t, out["C"]))
        else:
            C_T = out["C"][-1]
        C_inherit = p.inherit_frac_C * C_T
        
                                    
        p.t_end_min = original_t_end
    
    return np.array(mat), trow


def delta_r_custom(p: Params, t_start_min: float, t_end_min: float, include_decay: bool = True) -> float:
    """Calculate Delta r between t_start_min and t_end_min after birth"""
    original_t_end = p.t_end_min
    p.t_end_min = max(t_end_min, p.t_end_min)
    
    t, out = simulate_single_cell(p, include_decay=include_decay)
    r_start = float(np.interp(t_start_min, t, out["r"]))
    r_end = float(np.interp(t_end_min, t, out["r"]))
    
                                
    p.t_end_min = original_t_end
    return r_end - r_start


                                                      
def plot_timeseries_dual_y(t: np.ndarray, out: Dict[str, np.ndarray], 
                          title: str = "Single-cell: B/R (left) & r (right)") -> None:
    """Plot B and R on left axis, r ratio on right axis"""
    fig = plt.figure(figsize=(12, 6))
    ax = fig.add_subplot(111)
    
                                                  
    t_hours = t / 60.0
    
                  
    ax.plot(t_hours, out["B"], label="Blue (B)", color="#1f77b4")
    ax.plot(t_hours, out["R"], label="Red (R)", color="#ff7f0e")
    ax.set_xlabel("Time since birth (hours)")
    ax.set_ylabel("Concentration (a.u.)")
    ax.legend(loc="upper left")
    ax.grid(True, alpha=0.3)
    
    ax.legend(loc="upper left")
    
                         
    axr = ax.twinx()
                                                             
    axr.plot(t_hours, out["r"], linestyle="--", label="r = R/(B+R)", color="#2ca02c")
    axr.set_ylabel("r (0-1)")
    axr.set_ylim(0, 1)
    axr.legend(loc="upper right")
    
    ax.tick_params(axis='both', labelsize=20, width=2.0, length=8)
    for s in ax.spines.values():
        s.set_linewidth(2.0)
    axr.tick_params(axis='both', labelsize=20, width=2.0, length=8)
    for s in axr.spines.values():
        s.set_linewidth(2.0)
    fig.tight_layout()
    save_figure(fig, title)

def plot_r_zoom_and_slope(t: np.ndarray, r: np.ndarray, 
                         zoom_to_hours: float = 24.0, 
                         title: str = "r(t) and its derivative (0-24 hours)") -> None:
    """Plot r(t) and its time derivative (dr/dt) for early time window"""
    fig = plt.figure(figsize=(12, 6))
    ax = fig.add_subplot(111)
    
                                                  
    t_hours = t / 60.0
    zoom_to_min = zoom_to_hours * 60.0
    
                                   
    mask = t <= zoom_to_min
    t_zoom, r_zoom = t_hours[mask], r[mask]
    
               
    ax.plot(t_zoom, r_zoom, label="r(t)", color="#2ca02c")
    ax.set_xlabel("Time since birth (hours)")
    ax.set_ylabel("r")
    ax.legend(loc="upper left")
    ax.grid(True, alpha=0.3)
    
                                   
    drdt = np.gradient(r, t/60.0)                     
    axr = ax.twinx()
    axr.plot(t_zoom, drdt[mask], alpha=0.7, label="dr/dt", color="#d62728")
    axr.set_ylabel("dr/dt (per hour)")
    axr.legend(loc="upper right")
    
    ax.tick_params(axis='both', labelsize=20, width=2.0, length=8)
    for s in ax.spines.values():
        s.set_linewidth(2.0)
    axr.tick_params(axis='both', labelsize=20, width=2.0, length=8)
    for s in axr.spines.values():
        s.set_linewidth(2.0)
    fig.tight_layout()
    save_figure(fig, title)

def plot_lineage_heatmap(mat: np.ndarray, trow: np.ndarray,
                        title: str = "Lineage r heatmap (birth-aligned)",
                        vmin: float = 0.0, vmax: float = 1.0) -> None:
    """Plot heatmap of lineage data"""
    fig = plt.figure(figsize=(12, 6))
    ax = fig.add_subplot(111)
    
                           
    trow_hours = trow / 60.0
    
                    
    im = ax.imshow(mat, origin='lower', aspect='auto',
                  extent=[trow_hours[0], trow_hours[-1], 0, mat.shape[0]],
                  vmin=vmin, vmax=vmax, cmap="viridis")
    
                             
    ax.set_xlabel("Time since birth (hours)")
    ax.set_ylabel("Generation index")
    fig.colorbar(im, ax=ax, label="r value")
    ax.tick_params(axis='both', labelsize=20, width=2.0, length=8)
    for s in ax.spines.values():
        s.set_linewidth(2.0)
    fig.tight_layout()
    save_figure(fig, title)

def plot_delta_r_vs_tau(tau_list: List[float], yvals: List[float],
                       title: str = "Delta r vs pulse width tau") -> None:
    """Plot Delta r versus pulse width"""
    fig = plt.figure(figsize=(10, 6))
    ax = fig.add_subplot(111)
    
    ax.plot(tau_list, yvals, marker="o", linestyle="-", color="#9467bd", markersize=8)
    ax.set_xlabel("Pulse width tau (min)")
    ax.set_ylabel("Delta r = r(48h) - r(24h)")
    ax.grid(True, alpha=0.3)
    ax.tick_params(axis='both', labelsize=20, width=2.0, length=8)
    for s in ax.spines.values():
        s.set_linewidth(2.0)
    fig.tight_layout()
    save_figure(fig, title)



                                                               
def plot_maturation_pathway(t: np.ndarray, out: Dict[str, np.ndarray], title: str = "Fluorescent Protein Maturation Pathway") -> None:
    """Plot all maturation states (C->B->I->R) over time"""
    fig = plt.figure(figsize=(12, 6))
    ax = fig.add_subplot(111)
    
                           
    t_hours = t / 60.0
    
                     
    ax.plot(t_hours, out["C"], label="C (Initial)", color="#d62728")
    ax.plot(t_hours, out["B"], label="B (Blue)", color="#1f77b4")
    ax.plot(t_hours, out["I"], label="I (Intermediate)", color="#ff7f0e")
    ax.plot(t_hours, out["R"], label="R (Red)", color="#2ca02c")
    
    ax.set_xlabel("Time since birth (hours)")
    ax.set_ylabel("Concentration (a.u.)")
    ax.legend(loc="upper right")
    ax.grid(True, alpha=0.3)
    ax.tick_params(axis='both', labelsize=20, width=2.0, length=8)
    for s in ax.spines.values():
        s.set_linewidth(2.0)
    fig.tight_layout()
    save_figure(fig, title)

                                                  
def main():
    """Run example simulations and generate key figures"""
                                            
    p = Params()
    
                                              
    print("--- Generating single-cell timeseries figure ---")
    t, out = simulate_single_cell(p, include_decay=True)
    plot_timeseries_dual_y(t, out, title="Single-cell: B/R (left) & r (right)")
    
                                           
    print("\n--- Generating r(t) and derivative figure ---")
    plot_r_zoom_and_slope(t, out["r"], title="r(t) and its derivative (0â€?24 hours)")

                                          
    print("\n--- Generating maturation pathway figure ---")
    plot_maturation_pathway(t, out, title="Fluorescent Protein Maturation Pathway")

                                           
    print("\n--- Generating Delta r vs pulse width figure ---")
    tau_values = [10, 15, 20, 25, 30, 35]
    delta_r_values = []
    
                                              
    t_start_measure_min = 24 * 60            
    t_end_measure_min = 48 * 60              

    for tau in tau_values:
        p.pulse_width_min = tau
                                                                  
        dr = delta_r_custom(p, t_start_measure_min, t_end_measure_min, include_decay=True)
        delta_r_values.append(dr)
        print(f"  tau = {tau} min, Delta r = {dr:.4e}")
    
    plot_delta_r_vs_tau(tau_values, delta_r_values,
                        title=f"Delta r ({t_start_measure_min/60:.0f}h-{t_end_measure_min/60:.0f}h) vs pulse width tau")

                                                
    print("\n--- Generating lineage heatmap analysis ---")
    
                                                       
    p.pulse_width_min = 15.0
    
                                                            
    mat, trow = lineage_matrix(p, generations=6, include_decay=True)
    
                             
    plot_lineage_heatmap(mat, trow,
                        title="Lineage r heatmap (birth-aligned)",
                        vmin=0.0, vmax=1.0)
    
                                                        
                                                                                   
    mat_corrected = mat - mat[:, 0:1]                                   
    
    plot_lineage_heatmap(mat_corrected, trow,
                        title="Lineage r' heatmap (baseline-corrected)",
                        vmin=0.0, vmax=np.max(mat_corrected))
    
    print(f"  Original r range: {np.min(mat):.3f} - {np.max(mat):.3f}")
    print(f"  Baseline-corrected r' range: {np.min(mat_corrected):.3f} - {np.max(mat_corrected):.3f}")

    print("\nSimulation complete. Figures saved with prefix:", p.save_prefix)

if __name__ == "__main__":
    main()
