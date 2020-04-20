const path = require(`path`);

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  const {
    data: {
      allFile: { nodes },
    },
  } = await graphql(`
    query {
      allFile(filter: { absolutePath: { regex: "//studies/.*index.md/" } }) {
        nodes {
          absolutePath
          relativeDirectory
        }
      }
    }
  `);

  nodes.forEach((node) => {
    createPage({
      path: `/studies/${node.relativeDirectory}/`,
      component: path.resolve(`./src/templates/studies.js`),
      context: { sourcePath: node.absolutePath },
    });
  });
};
