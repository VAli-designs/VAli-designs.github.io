const path = require(`path`);
const remark = require('remark');
const remarkHTML = require('remark-html');

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

exports.onCreateNode = ({ node }) => {
  if (node.frontmatter) {
    recursiveTransform(node.frontmatter);
  }
  return node;
};

const recursiveTransform = (attr) => {
  Object.keys(attr).forEach((key) => {
    const val = attr[key];
    if (!val) {
      return;
    }
    if (Array.isArray(val) && val[0] && typeof val[0] === 'object') {
      val.forEach(recursiveTransform);
    } else if (typeof val === 'object') {
      recursiveTransform(val);
    } else if (key === 'body' && typeof val === 'string') {
      attr[key] = remark().use(remarkHTML).processSync(val).toString();
    }
  });
};
