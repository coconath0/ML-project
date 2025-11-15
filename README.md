💧 Water Quality Prediction Project (OpenML ID: 46085)

This repository contains the analysis and modeling code for the Water Quality Hazard Classification project.

👥 Setup and Local Environment

IMPORTANT: This project uses a large dataset (`water-quality-46085.csv`) which IS NOT stored in Git. You must follow the steps below to fetch the data locally.

1. Initial Setup

Clone the repository:
```
  git clone [Your Repository URL]
  cd [Your-Repo-Name]
```

Create the Data Folder: This folder is necessary because the Python notebooks look for the data here.

```mkdir data```


Install Python Dependencies: (You might need a virtual environment, e.g., venv or conda):

```pip install openml pandas numpy matplotlib seaborn```


2. Fetch the Dataset Locally (Action Required)

The dataset is retrieved directly from OpenML using its ID (`46085`) and saved into your local `/data/` folder.

Action: Open the data_fetch_script.ipynb notebook located in the root of the project and run all cells.

⚙️ The Fetching Code Snippet:

The script ensures you have the exact file named `water-quality-46085.csv` in your local `/data/` folder. First, file `obtain-csv.ipynb` should be executed, to get the dataset from openML:

```
import openml
import os
# ... (rest of the fetching and saving code)
# ... 
OUTPUT_FILE = os.path.join(OUTPUT_FOLDER, 'water-quality-46085.csv')
# ...
```


3. Workflow for Collaboration (Git)

Never commit the `/data/` folder. The `.gitignore` file already prevents this.

Always pull changes before you start working: git pull origin main

Always push your changes when you finish a task: `git push origin [your-branch-name]`

🔬 Next Steps: Data Quality Report

Your first task is to open `water_quality_analysis.ipynb` and run the notebook top-to-bottom. This notebook will:

Load the data from your local `/data/` folder.

Pivot the long-format data into a wide format.

Generate the full Attribute Quality Report (missing values, range, $\text{N/A}$ count for all $\approx 25$ columns).

Produce the Histograms and Correlation Heatmap for the professor's review.