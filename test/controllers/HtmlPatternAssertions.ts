export function expectToHaveTitle(body: string, expectedTitle: string): void {
  const patternStr = `<title>\\s*${expectedTitle}\\s*<\/title>`;
  const pattern = new RegExp(patternStr, 's');
  expect(body).toMatch(pattern);
}
