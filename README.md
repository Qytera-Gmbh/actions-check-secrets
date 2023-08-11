# actions-check-secrets

Mini action for verifying that certain secrets have been passed to the job.

## Inputs

### `names`

**Required** A (multiline) string containing the names of the secrets to check, separated by newline characters.

## Outputs

> None

## Example usage

```yaml
uses: qytera-gmbh/actions-check-secrets@v1
with:
    names: |
        MY_SECRET
        YOUR_SECRET
        HER_SECRET
```
