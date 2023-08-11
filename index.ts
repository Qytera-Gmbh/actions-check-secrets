import chalk from "chalk";
import core from "./core";

export function main() {
    try {
        const secretNames: string[] = core.getInput("names").split("\n");

        if (secretNames.length === 0 || secretNames.every((name) => name.length === 0)) {
            core.warning(chalk.yellow("Skipping secret check, no names were provided"));
            return;
        }

        core.info(chalk.whiteBright("Checking availability of secrets..."));

        let allExist = true;

        secretNames.forEach((name) => {
            if (name in process.env && process.env[name].length > 0) {
                core.info(chalk.green(`  ✓ ${name}`));
            } else {
                core.info(chalk.red(`  ✗ ${name}`));
                allExist = false;
            }
        });

        if (!allExist) {
            core.error(
                chalk.red(
                    "If dependabot initiated the workflow, make sure to add the missing secrets to Dependabot's secrets."
                )
            );
            core.error(
                chalk.red(
                    "More information: https://docs.github.com/en/code-security/dependabot/working-with-dependabot/configuring-access-to-private-registries-for-dependabot"
                )
            );
            core.setFailed("Some secrets were either not defined or blank");
        }
    } catch (error) {
        core.error(error);
        core.setFailed(error.message);
    }
}

// Run the action.
main();
