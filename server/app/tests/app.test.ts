/**
 * Jest Tests
 * =====================
 *
 * Alì Shadman [@AliShadman95] (https://github.com/AliShadman95)
 *
 * @license: MIT License
 *
 */
test("show hello world", async () => {
	const app = () => "hello-world";
	expect(app()).toBe("hello-world");
});
