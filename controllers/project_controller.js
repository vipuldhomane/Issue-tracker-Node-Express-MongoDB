const Project = require("../models/project");
const Issue = require("../models/issue");
const { findById } = require("../models/project");

// create a project for the user
module.exports.create = async function (req, res) {
  try {
    Project.create({
      name: req.body.name,
      description: req.body.description,
      author: req.body.author,
    });
    return res.redirect("back");
  } catch (err) {
    console.log(err);
    return res.redirect("back");
  }
};

// find project and display it in the project page
module.exports.project = async function (req, res) {
  try {
    let project = await Project.findById(req.params.id).populate({
      path: "issues",
    });
    if (project) {
      return res.render("project_page", {
        title: "Project Page",
        project,
      });
    }
    return res.redirect("back");
  } catch (err) {
    console.log(err);
    return res.redirect("back");
  }
};

// create issue
module.exports.createIssue = async function (req, res) {
  try {
    let project = await Project.findById(req.params.id);
    if (project) {
      // crate the issue with issue schema
      let issue = await Issue.create({
        title: req.body.title,
        description: req.body.description,
        labels: req.body.labels,
        author: req.body.author,
      });
      // push issue to the issues reference (populated) in project schema
      project.issues.push(issue);

      // Labels part
      // Check if labels are provided and add them to the project's labels array
      if (!(typeof req.body.labels === "string")) {
        for (let label of req.body.labels) {
          // Check if the label is not already present in the project's labels
          let isPresent = project.labels.find((obj) => obj == label);
          if (!isPresent) {
            // Add the label to the project's labels array if label does not exits
            project.labels.push(label);
          }
        }
      } else {
        // Check if the single label is not already present in the project's labels
        let isPresent = project.labels.find((obj) => obj == req.body.labels);
        if (!isPresent) {
          // Add the single label to the project's labels array
          project.labels.push(req.body.labels);
        }
      }
      await project.save();
      return res.redirect(`back`);
    } else {
      return res.redirect("back");
    }
  } catch (err) {
    return res.redirect("back");
  }
};
