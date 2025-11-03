import fs from "fs-extra";
import { glob } from "glob";
import imagemin from "imagemin";
import imageminWebp from "imagemin-webp";
import postcss from "postcss";
import autoprefixer from "autoprefixer";
import { PurgeCSS } from "purgecss";
const srcFolder = "src/assets";
const outFolder = "optimized_build";

// 1️⃣ Convert PNG to WebP
async function convertToWebp() {
  console.log("🖼️ Converting PNGs to WebP...");
  const files = await glob(`${srcFolder}/**/*.png`);
  await imagemin(files, {
    destination: srcFolder,
    plugins: [imageminWebp({ quality: 80 })],
  });
  console.log(`✅ Converted ${files.length} images`);
}

// 2️⃣ Update references (.png → .webp)
async function updateReferences() {
  console.log("📝 Updating image references...");
  const files = await glob("src/**/*.{js,jsx,html,css}");
  for (const file of files) {
    let content = await fs.readFile(file, "utf-8");
    content = content.replace(/\.png/g, ".webp");
    // add loading="lazy" in <img> tags
    content = content.replace(
      /<img(?![^>]*loading=)/g,
      '<img loading="lazy"'
    );
    await fs.writeFile(file, content);
  }
  console.log("✅ References updated");
}

// 3️⃣ Purge unused Tailwind CSS
async function optimizeTailwind() {
  console.log("🎨 Cleaning unused Tailwind CSS...");
  const cssFiles = await glob("src/**/*.css");
  for (const cssFile of cssFiles) {
    const content = await fs.readFile(cssFile, "utf-8");
    const purgeCSSResults = await new PurgeCSS().purge({
      content: ["src/**/*.{js,jsx,html}"],
      css: [{ raw: content }],
    });
    const result = await postcss([autoprefixer]).process(
      purgeCSSResults[0].css,
      { from: undefined }
    );
    await fs.writeFile(cssFile, result.css);
  }
  console.log("✅ Tailwind optimized");
}

// 4️⃣ Copy to optimized_build folder
async function copyOptimized() {
  console.log("📦 Copying to optimized_build...");
  await fs.copy("src", `${outFolder}/src`);
  console.log("✅ Done! Optimized build ready.");
}

// Run all
(async () => {
  await convertToWebp();
  await updateReferences();
  await optimizeTailwind();
  await copyOptimized();
  console.log("\n🎉 All optimization done! Check /optimized_build folder.");
})();
