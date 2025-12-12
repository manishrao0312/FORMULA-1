from PIL import Image, ImageOps

def match_image_dimensions(target_path, reference_path, output_path):
    try:
        # 1. Open both images
        target_img = Image.open(target_path)
        ref_img = Image.open(reference_path)

        # 2. Get dimensions of the reference image
        ref_width, ref_height = ref_img.size
        print(f"Reference Dimensions: {ref_width}x{ref_height}")

        # 3. Resize and Center Crop the target image to match reference
        # ImageOps.fit resizes the image to fill the requested size, 
        # maintaining aspect ratio, and then crops the excess.
        processed_img = ImageOps.fit(target_img, (ref_width, ref_height), method=Image.Resampling.LANCZOS, centering=(0.5, 0.5))

        # 4. Save the result
        processed_img.save(output_path, 'JPEG', quality=95)
        print(f"Success! Image saved to: {output_path}")

    except Exception as e:
        print(f"An error occurred: {e}")

# Usage
# Replace these filenames with the actual paths on your machine
reference_file = "M.S LOLAKSHI(4MW22CS087).jpg" 
target_file = "WhatsApp Image 2025-12-12 at 14.09.01_7a6c9165.jpg"

match_image_dimensions(target_file, reference_file, "Formatted_Output.jpg")