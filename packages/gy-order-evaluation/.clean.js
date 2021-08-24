/* eslint-disable */
const fs = require("fs");
const resolve = require("path").resolve;

function delDir(path) {
  let files = [];
  if (fs.existsSync(path)) {
    files = fs.readdirSync(path);
    files.forEach((file) => {
      let curPath = path + "/" + file;
      if (fs.statSync(curPath).isDirectory()) {
        delDir(curPath);
      } else {
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(path);
  }
}

function delFile(path) {
  if (fs.existsSync(path)) {
    fs.unlinkSync(path);
  }
}

function cleanPkg() {
  const file = resolve("package.json");
  const encoding = "utf-8";
  const pkgContent = fs.readFileSync(file, encoding);
  const pkg = JSON.parse(pkgContent);
  delete pkg.scripts["clean"];
  delete pkg.scripts["test:unit"];
  delete pkg.scripts["test:e2e"];
  delete pkg.dependencies["vue-i18n"];
  delete pkg.devDependencies["@types/jest"];
  delete pkg.devDependencies["@vue/cli-plugin-unit-jest"];
  delete pkg.devDependencies["@vue/test-utils"];
  fs.writeFileSync(file, JSON.stringify(pkg, "", 2), encoding);
}

function cleanTsc() {
  const file = resolve("tsconfig.json");
  const encoding = "utf-8";
  const tsContent = fs.readFileSync(file, encoding);
  fs.writeFileSync(
    file,
    tsContent.replace(`["webpack-env", "jest"]`, `["webpack-env"]`),
    encoding
  );
}

cleanTsc();
cleanPkg();
delDir(resolve("mock"));
delDir(resolve("src", "lang"));
delDir(resolve("tests"));
delFile(resolve("jest.config.js"));
delFile(resolve(".clean.js"));
