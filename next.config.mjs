import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

// const withNextIntl = require("next-intl/plugin")();
/** @type {import('next').NextC(onfig} */
const nextConfig = {};

export default withNextIntl(nextConfig);
