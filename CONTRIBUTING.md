# How to Contribute

The Fantasy Basketball API is an open-source project designed to provide developers with information on the best players from each team to help fantasy basketball enthusiasts find the best information possible. 

If you would like to contribute, please follow the instructions in our README[link] to clone down the repo and get it running on your machine. 

## Getting started
Once you have the local dev environment setup, checkout to a new branch on your machine where you will make changes.

```
$ git checkout -b YOUR_BRANCH_NAME
```

## Atomic Commits

As you work, please make sure to make atomic commits with clear and concise commit messages. Write your commit message in the imperative (for example, use "Fix" instead of "Fixes" or "Fixed"), capatalize properly, and do not end the subject line with punctuation. 

As you commit, make sure you are using git rebase workflow:
```
$ git pull --rebase origin master
```

Once you've completed an issue or piece of functionality, run the test suite and the linter to make sure there are no failing tests and no linter errors.
```
$ npm test
$ npm run lint 
```

## Pushing up and creating a pull request

Unless you've changed the remote name, you will push your changes to origin.
```
$ git push origin YOUR_BRANCH_NAME
```

Use the GitHub interface to submit a new pull request. When creating a pull request, use the following list as a template:

 - Provide an explanation of the problem you are solving. 
 - Indicate whether there are any tests not passing or whether there are any linter errors, making sure to provide the error message and/or test failure message. 
 - Include any areas of concern you might have where we can focus as we review your PR. 
 - If you have any suggestions for future issues or features that can be added to the codebase, please add them at the end. 

We will get back to you with questions, suggestions, praise, and thanks as soon as we can. To start, thanks for contributing!