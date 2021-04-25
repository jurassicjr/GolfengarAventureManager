# BACK-END MANAGEMENT SYSTEM FORECAST

This back-end is an API that will integrate the front-end system that will be used in the forecast and the current legacy system. The objective is to improve the commercial sector, marketing, collection, technical support and processes of companies in the same sector of activity (sale of funeral and health plans).

## Installation and recommendations

Use the package manager [yarn] (https://classic.yarnpkg.com/en/docs/install) to install the system.

`` bash
yarn add
``

## Standards

The following standards should be used in the realization of new "features" of the system.

* The main branch is the branch that is in production.
* The branch development is a copy of the main where the test versions will be released before going into production
* If what you are going to do is develop a new function
  * Create a branch from branch development
  * Name as features / function_name
* If what you have to do is fix a bug
  * If the correction is in a feature not yet converged
     * Create a branch from the feature branch
     * Name as hotfix / hotfix_name
  * If the feature in question has already been converged
     * Name as hotfix / name of the event / name of the photo

Example of creating a branch

`` git
git checkout branch_pai
git branch new_name_branch
git checkout new_name_branch
``

## Commit
All commits must be extremely descriptive with an intuitive title and a complete description of what was done and details of the same

Run the tests before commits and report results.
