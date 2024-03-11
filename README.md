Thank you for participating in our Auteur user study. Please refer to the following steps to complete the study.

## Step 1

First, clone this repo locally:

```
git clone https://github.com/auteur-vis/auteur-study.git
```

Then install all necessary packages using `npm install`.

If all packages have been successfully installed, running `npm run storybook` should open a new browser window with 7 tabs on the left (Tasks 1-7). Each tab should display a single visualization.

The code for the 7 visualizations can be accessed in the `/stories/ChartAccent` folder.

## Step 2

Refer to the Auteur documentation [here](https://auteur-vis.github.io/auteur-doc/gettingstarted) to install Auteur.

Next, for each visualization, please edit the corresponding code file in the `/stories/ChartAccent` folder to add Auteur specifications to the visualizations. Do your best to make the end visualization look as close to the following screenshots as possible. You can refer to anything in the [documentation](https://auteur-vis.github.io/auteur-doc/documentation) or [gallery examples](https://auteur-vis.github.io/auteur-doc/gallery) when completing this step.

Please do not install or use additional libraries, but you may otherwise edit the provided code (including the D3 and html segments) as needed.

### Task 1

Select and highlight four individual data items; include only stroke and text label for each data item:

![Task1 Screenshot](/screenshots/Task1.png)

### Task 2

Select and highlight two sets of data items; include only regression lines for both sets; modify regression line colors:

![Task2 Screenshot](/screenshots/Task2.png)

### Task 3

Highlight three coordinate space ranges; modify fill color of each range; edit text labels for these coordinate space ranges:

![Task3 Screenshot](/screenshots/Task3.png)

### Task 4

Select each series; add regression line for each series:

![Task4 Screenshot](/screenshots/Task4.png)

### Task 5

Select and highlight a series and four individual data items, diminish opacity of all other data items:

![Task5 Screenshot](/screenshots/Task5.png)

### Task 6

Add a threshold at the average x value; select and highlight all data items with a greater x value; include text label of threshold x value:

![Task6 Screenshot](/screenshots/Task6.png)

### Task 7

Highlight the months when Charlotte and Seattle’s temperatures are higher than New York’s average:

![Task7 Screenshot](/screenshots/Task7.png)

## Step 3

Once you are satisfied with your augmented visualizations, please create a new github branch with your participant ID, and push your code to this branch. DO NOT push any of your edits to the main branch.

We have [a short survey to gather feedback about your experience here](). This survey will not take more than 10 minutes.

Thank you for your participation in this user study. We appreciate your help.