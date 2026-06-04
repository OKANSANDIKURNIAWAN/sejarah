import subprocess
import sys

# Try using Pillow with svglib
try:
    from svglib.svglib import svg2rlg
    from reportlab.graphics import renderPM
    
    svgs = [
        ('krisis_ekonomi.svg', 'krisis_ekonomi.png'),
        ('gelombang_mahasiswa.svg', 'gelombang_mahasiswa.png'),
        ('krisis_kepercayaan.svg', 'krisis_kepercayaan.png'),
    ]
    
    for svg_file, png_file in svgs:
        try:
            drawing = svg2rlg(svg_file)
            renderPM.drawToFile(drawing, png_file, fmt="PNG", dpi=96)
            print(f"✓ Converted {svg_file} to {png_file}")
        except Exception as e:
            print(f"Error converting {svg_file}: {e}")
            
except ImportError as e:
    print(f"Installing required packages: {e}")
    subprocess.check_call([sys.executable, '-m', 'pip', 'install', 'svglib', 'reportlab', 'pillow', '-q'])
    
    from svglib.svglib import svg2rlg
    from reportlab.graphics import renderPM
    
    svgs = [
        ('krisis_ekonomi.svg', 'krisis_ekonomi.png'),
        ('gelombang_mahasiswa.svg', 'gelombang_mahasiswa.png'),
        ('krisis_kepercayaan.svg', 'krisis_kepercayaan.png'),
    ]
    
    for svg_file, png_file in svgs:
        try:
            drawing = svg2rlg(svg_file)
            renderPM.drawToFile(drawing, png_file, fmt="PNG", dpi=96)
            print(f"✓ Converted {svg_file} to {png_file}")
        except Exception as e:
            print(f"Error converting {svg_file}: {e}")
