module.exports = {
    extends: ["standard"],
    parserOptions: {
        ecmaVersion: 6,
        sourceType: "module"
    },
    env: {
        node: true,
        es6: true,
    },
    rules: {
        "no-undef": ["warn"],
        "no-unused-vars": ["warn"],
        "no-unreachable": ["warn"],
        "semi": ["off"],
        "quotes": ["warn", "double"]
    }
};