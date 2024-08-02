This branch includes all participant responses and study results. For original study materials please switch to the main branch: https://github.com/auteur-vis/auteur-study-results

# Results

First, clone this repo locally:

```
git clone https://github.com/auteur-vis/auteur-study.git
```

Then fetch and switch to the results branch:

```
git fetch origin
git switch -c results origin/results
```

Install all necessary packages using `npm install`.

If all packages have been successfully installed, running `npm run storybook` should open a new browser window with 5 tabs. Each tab includes 7 visualizations. The tab labeled D3 includes the original visualization code given to participants, without augmentations. The tabs labeled P1-4 include Auteur augmentations added by study participants.