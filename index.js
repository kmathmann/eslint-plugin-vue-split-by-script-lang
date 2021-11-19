const vueEslintPluginProcessor = require('eslint-plugin-vue/lib/processor');

const langRegex = /<script(\slang="(?<lang>[a-zA-Z]*)")?>/;

const processor = {
  ...vueEslintPluginProcessor,

  preprocess(text) {
    const matches = text.match(langRegex);
    const lang = (matches && matches.groups.lang) || 'js';

    if (lang === 'js') {
      return vueEslintPluginProcessor.preprocess(text);
    }

    return [{
      text,
      filename: filename.replace(/\.vue$/, `.${lang}vue`),
    }];
  },
};

module.exports = {
  processors: {
    '.vue': processor,
  },
};
