import { exec } from "child_process";

export const runPythonScript = (scriptPath, args = "") => {
  console.log(`Executing Python script: python ${scriptPath} ${args}`);
  return new Promise((resolve, reject) => {
    exec(`py ${scriptPath} ${args}`, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error executing Python script: ${error.message}`);
        return reject(
          new Error(`Error executing Python script: ${error.message}`)
        );
      }
      if (stderr) {
        console.error(`Python script stderr: ${stderr}`);
        return reject(new Error(`Python script stderr: ${stderr}`));
      }
      try {
        console.log(`Python script stdout: ${stdout}`);
        const output = JSON.parse(stdout);
        resolve(output);
      } catch (parseError) {
        console.error(`Error parsing JSON output: ${parseError.message}`);
        reject(new Error(`Error parsing JSON output: ${parseError.message}`));
      }
    });
  });
};
