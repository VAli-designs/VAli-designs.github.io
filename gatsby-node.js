const path = require(`path`);
const remark = require('remark');
const remarkHTML = require('remark-html');

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  const {
    data: {
      studies: { nodes: studies },
      posts: { nodes: posts },
    },
  } = await graphql(`
    query {
      studies: allFile(
        filter: { absolutePath: { regex: "//studies/.*[.]md$/" } }
      ) {
        nodes {
          absolutePath
          name
        }
      }
      posts: allFile(filter: { absolutePath: { regex: "//blog/.*[.]md$/" } }) {
        nodes {
          absolutePath
          name
        }
      }
    }
  `);

  studies.forEach((node) => {
    createPage({
      path: `/studies/${node.name}/`,
      component: path.resolve(`./src/templates/studies.js`),
      context: { sourcePath: node.absolutePath },
    });
  });
  posts.forEach((node) => {
    createPage({
      path: `/blog/${node.name}/`,
      component: path.resolve(`./src/templates/article.js`),
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
    } else if (
      (key === 'body' || key === 'excerpt') &&
      typeof val === 'string'
    ) {
      attr[key] = remark()
        .use({ settings: { commonmark: true } })
        .use(remarkHTML)
        .processSync(val)
        .toString();
    }
  });
};
