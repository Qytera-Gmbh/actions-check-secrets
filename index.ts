import * as core from "@actions/core";
import colors from "ansi-colors";

export function main() {
    try {
        const secretNames: string[] = core.getMultilineInput("names");
        if (!secretNames) {
            core.setFailed("No value provided for required input: names");
            return;
        }
        if (secretNames.length === 0 || secretNames.every((name) => name.length === 0)) {
            core.warning(colors.yellow("Skipping secret check, no names were provided"));
            return;
        }
        core.info(colors.whiteBright("Checking availability of secrets..."));
        let allExist = true;
        secretNames.forEach((name) => {
            if (name in process.env && process.env[name].length > 0) {
                core.info(colors.green(`  ✓ ${name}`));
            } else {
                core.info(colors.red(`  ✗ ${name}`));
                allExist = false;
            }
        });
        if (!allExist) {
            core.error(
                colors.red(
                    "If dependabot initiated the workflow, make sure to add the missing secrets to Dependabot's secrets."
                )
            );
            core.error(
                colors.red(
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
