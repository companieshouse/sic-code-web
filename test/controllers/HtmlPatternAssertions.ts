export function expectToHaveTitle(body: string, expectedTitle: string): void {
  const patternStr = `<title>\\s*${expectedTitle}\\s*<\/title>`;
  const pattern = new RegExp(patternStr, 's');
  expect(body).toMatch(pattern);
}

export function expectToHaveTableRow(body: string, sicCode: string, sicDescription: string, economicActivity: string): void {
  const patternStr = `<tr class="govuk-table__row">.*>${sicCode}<.*>${sicDescription}<.*>${economicActivity}<.*</tr>`
  const pattern = new RegExp(patternStr, 's');
  expect(body).toMatch(pattern);
}
