// const packageFile = Bun.file('./package.json');
// const readMeFile = Bun.file('./README.md');
//
// const packageBase = await packageFile.json();
// const readMe = await readMeFile.text();
//
// const { scripts, devDependencies, type, ...common } = packageBase;
// const packageBuild = common;
//
// await Bun.write('./build/README.md', readMe);
// await Bun.write('./build/package.json', JSON.stringify(packageBuild, null, 2));
