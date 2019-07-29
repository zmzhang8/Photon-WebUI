module.exports = {
    runtimeCompiler: true,
    publicPath: process.env.NODE_ENV === 'production' ? '/Photon-WebUI/' : '/',
    outputDir: 'docs'
}
