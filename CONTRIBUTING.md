# Contributing to Lookbook

**🙏 Thank you for your interest in contributing to Lookbook! 🙏**

Lookbook is an open source project and we encourage (and are very grateful of!) contributions of all types.

Before making your first contribution please to review this document to make contributing easy and effective for everyone involved.

Contributions to this project are released to the public under the [MIT license](./LICENSE.txt).

## Filing an issue

> Please think carefully before using the issue tracker for personal support requests. Whilst we will do our best to help answer them it will take time away from development work and you may be better off starting [a discussion](https://github.com/allmarkedup/lookbook/discussions) instead where fellow community members may be able to help out.

**A good issue report is always welcome!**

The more detail you can give the quicker we can start work on tracking down and addressing the issue and the less of your time we need to take up asking for further information

Steps:

1. **Use the GitHub issue search** &mdash; check if the issue has already been
   reported and/or fixed.

3. **Isolate the problem** &mdash; as far as possible make sure the issue is really a bug in
   Lookbook and not in your code or another gem.

4. **Report the issue** &mdash; use the issue template and fill in as much information as possible, including:

* The versions of Ruby, Rails, ViewComponent and Lookbook that you are using.
* A list of steps to reproduce the issue (or even better a passing/failing test spec!).
* Any relevant stack traces.
* The debug data JSON obtained by clicking on the **(?)** icon in the top right of the Lookbook UI and then clicking on the 'Copy debug data' link in the dropdown. **This information contains file paths which you may want to redact before posting in an open forum**.

## Pull requests

We gladly accept pull requests to fix bugs or to propose new features to add to Lookbook, however if you have any substantial changes that you would like to make, please open an issue first to discuss them with us.

Every pull request should:

* **Include a concise description** of what the PR contains.
* **Follow Lookbook's coding conventions** &mdash; we use [Standard](https://github.com/testdouble/standard) for Ruby linting/formatting and [Prettier](https://prettier.io/) for almost everything else.
* **Follow Lookbook's commit message conventions** &mdash; we use [Angular-style](https://www.conventionalcommits.org/en/v1.0.0-beta.4/) commit messages.
* **Ensure that the existing tests pass**, and preferrably add more tests around the bug or feature addressed in  the PR.

Steps:

* Fork and clone the repository.
* Configure and install the dependencies: `bundle install`.
* Make sure the tests pass: `rake test`.
* Create a new branch: `git checkout -b my-branch-name`.
* Add tests, make the change, and make sure the tests still pass.
* Push to the fork and submit a pull request.
* Wait for the pull request to be reviewed and merged.

