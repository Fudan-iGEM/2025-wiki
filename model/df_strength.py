import numpy as np
import matplotlib.pyplot as plt
import os

def model_parameters(promoter_strength_factor=1.0):
    base_pulse_amplitude = 1.0
    base_maturation_rate = 0.8
    base_noise_level = 0.05
    
    pulse_amplitude = base_pulse_amplitude * promoter_strength_factor
    maturation_rate = base_maturation_rate * promoter_strength_factor
    noise_level = base_noise_level * (2.0 - promoter_strength_factor)
    
    noise_level = max(0, noise_level)
    
    total_protein = 1e6
    
    return pulse_amplitude, maturation_rate, noise_level, total_protein

def simulate_timer(pulse_amplitude, maturation_rate, noise_level, total_protein, generations=10):
    B = np.zeros(generations)
    R = np.zeros(generations)
    B[0] = 0.5 * total_protein
    R[0] = 0.5 * total_protein
    
    for gen in range(1, generations):
        pulse = np.random.normal(loc=pulse_amplitude, scale=0.1)
        B[gen] = B[gen-1] + pulse * np.random.normal(1, noise_level) - maturation_rate * R[gen-1]
        R[gen] = R[gen-1] + maturation_rate * B[gen-1] - pulse * np.random.normal(1, noise_level)
        
        B[gen] = max(0, B[gen])
        R[gen] = max(0, R[gen])
        
    r = R / (B + R)
    return r, B, R

def calculate_SNR(B, R, noise_level):
    signal = np.mean(R / (B + R))
    noise = np.std(R / (B + R))
    SNR = signal / (noise + noise_level)
    return SNR

def run_simulations(generations=10):
    strength_factors = [0.5, 0.75, 1, 1.5, 3, 5]
    results = {}
    
    for factor in strength_factors:
        pulse_amplitude, maturation_rate, noise_level, total_protein = model_parameters(factor)
        r, B, R = simulate_timer(pulse_amplitude, maturation_rate, noise_level, total_protein, generations)
        SNR_value = calculate_SNR(B, R, noise_level)
        results[factor] = {'r': r, 'SNR': SNR_value}
    
    plt.figure(figsize=(14, 7))
    
    plt.subplot(1, 2, 1)
    plt.title('Red to Blue Ratio Over Generations for Different Promoter Strengths', fontsize=12, pad=6)
    for factor in strength_factors:
        plt.plot(results[factor]['r'], label=f'Factor {factor}x')
    plt.xlabel('Generations')
    plt.ylabel('Red to Blue Ratio r(t)')
    plt.legend()
    ax = plt.gca()
    ax.tick_params(axis='both', labelsize=14, width=1.5, length=6)
    for s in ax.spines.values():
        s.set_linewidth(1.5)
    
    plt.subplot(1, 2, 2)
    plt.title('Signal-to-Noise Ratio (SNR) Comparison for Different Promoter Strengths', fontsize=12, pad=6)
    SNR_values = [results[factor]['SNR'] for factor in strength_factors]
    plt.bar([f'{factor}x' for factor in strength_factors], SNR_values, color='skyblue')
    plt.ylabel('Signal-to-Noise Ratio (SNR)')
    ax = plt.gca()
    ax.tick_params(axis='both', labelsize=14, width=1.5, length=6)
    for s in ax.spines.values():
        s.set_linewidth(1.5)

    fig = plt.gcf()
    fig.tight_layout()
    folder = os.path.join('.', 'df_strength_results')
    os.makedirs(folder, exist_ok=True)
    out_path = os.path.join(folder, 'df_strength_results.png')
    fig.savefig(out_path, dpi=300, bbox_inches='tight')
    plt.close(fig)

if __name__ == '__main__':
    plt.rcParams.update({
        'font.size': 14,
        'axes.labelsize': 16,
        'xtick.labelsize': 14,
        'ytick.labelsize': 14,
        'legend.fontsize': 12,
        'axes.linewidth': 1.5,
    })
    run_simulations(generations=10)
