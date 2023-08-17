import * as core from "@actions/core";
import colors from "ansi-colors";
import { main } from "./index";

jest.mock("@actions/core");

const mockedCore = core as jest.Mocked<typeof core>;

beforeEach(() => {
    jest.clearAllMocks();
});

describe("main", () => {
    it("access the correct input parameter", () => {
        main();
        expect(mockedCore.getMultilineInput).toHaveBeenCalledWith("names");
    });

    it("fails when the names input is missing", () => {
        main();
        expect(mockedCore.setFailed).toHaveBeenCalledWith(
            "No value provided for required input: names"
        );
    });

    it("skips when no names are provided", () => {
        mockedCore.getMultilineInput.mockReturnValue([]);
        main();
        expect(mockedCore.warning).toHaveBeenCalledWith(
            colors.yellow("Skipping secret check, no names were provided")
        );
    });

    it("processes missing single environment variables", () => {
        mockedCore.getMultilineInput.mockReturnValue(["VARIABLE"]);
        main();
        expect(mockedCore.info).toHaveBeenCalledWith(
            colors.whiteBright("Checking availability of secrets...")
        );
        expect(mockedCore.info).toHaveBeenCalledWith(colors.red("  ✗ VARIABLE"));
        expect(mockedCore.error).toHaveBeenCalledWith(
            colors.red(
                "If dependabot initiated the workflow, make sure to add the missing secrets to Dependabot's secrets."
            )
        );
        expect(mockedCore.error).toHaveBeenCalledWith(
            colors.red(
                "More information: https://docs.github.com/en/code-security/dependabot/working-with-dependabot/configuring-access-to-private-registries-for-dependabot"
            )
        );
    });
});
