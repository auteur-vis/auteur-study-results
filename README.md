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

Next, for each visualization, please edit the corresponding code file in the `/stories/ChartAccent` folder to add Auteur specifications to the visualizations. Do your best to make the end visualization look as close to the following screenshots as possible. Detailed instructions have been provided for Tasks 1 and 2.

You can refer to anything in the [documentation](https://auteur-vis.github.io/auteur-doc/documentation) or [gallery examples](https://auteur-vis.github.io/auteur-doc/gallery) when completing this step.

Please do not install or use additional libraries, but you may otherwise edit the provided code (including the D3 and html segments) as needed.

### Task 1

Using the Threshold generation criteria, specify the variable of interest "MPG", value "mean", and relationship type "geq":

![Task1 Screenshot](/screenshots/Task1.png)

### Task 2

Take a union of two Emphasis generation criteria; the first emphasis is for the variable "Country" when the value is "Hong Kong, China", "Afghanistan", "Sweden", or "Greece"; the second emphasis is for the variable "Region" when the value is "Sub-Saharan Africa"; for each emphasis generation criterion, use the .include() function to define which augmentations are applied; for the "Country" emphasis, include ["stroke", "opacity", "label"]; for the "Region" emphasis, include ["stroke", "opacity"] only:

![Task2 Screenshot](/screenshots/Task2.png)

### Task 3

![Task3 Screenshot](/screenshots/Task3.png)

### Task 4

![Task4 Screenshot](/screenshots/Task4.png)

### Task 5

![Task5 Screenshot](/screenshots/Task5.png)

### Task 6

![Task6 Screenshot](/screenshots/Task6.png)

### Task 7

![Task7 Screenshot](/screenshots/Task7.png)

## Step 3

Once you are satisfied with your augmented visualizations, please create a new github branch with your participant ID, and push your code to this branch. DO NOT push any of your edits to the main branch.

We have [a short survey to gather feedback about your experience here](https://gatech.co1.qualtrics.com/jfe/form/SV_0CYKGDlbV7MYd8O). This survey will not take more than 10 minutes.

Thank you for your participation in this user study. We appreciate your help.