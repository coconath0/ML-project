# Project Proposal Title: 
*Water Quality Hazard Classification and Attribute Analysis*

## Teammates
- Nathaly Ingol - qhd10
- Aleena Tomy - zdh39
- JD (John) Escobedo - dxh19

## Project Abstract
In this project, we would like to focus on pollution metrics for water quality to predict when a future hazardous pollution level could be observed. The model would be fed the Water_Quality dataset with over 30 million values to train on. While there are around 10 million potentially empty values, we believe having a large dataset that is not completely sterile will allow us to improve our understanding of modelling better. We will implement gradient boosting to ensure the final output of the model has iterated sufficiently to improve on previous errors. The parameters that seem the most promising to predict water pollution are Fecal Coliform, Nitrogen, Temperature and a few others along with location features. We believe with some minor feature selection, we can effectively determine the most likely contributing factors to a future water pollution hazard.

Water quality monitoring often involves slow, expensive lab tests, and identifying which sites are becoming polluted is challenging due to the large number of parameters. Our objective is to develop a Classification Model that can accurately predict if a water sample (based on its chemical fingerprint and location) will exceed critical health/environmental thresholds.

## Problem Statement
Water quality is a pressing issue that has become more important as scarcity in southern and/or landlocked regions has resulted in more advanced solutions. With a large dataset comprised of various observation sites, we aim to effectively determine which factors play the largest role in determining when a given water site will reach a hazardous pollution level.

In doing so, we believe we can contribute to finding patterns or markers that will allow for the prevention of major pollution of a water site based on its current content, temperature, and location etc.

* **Problem**: The raw data is in a complex long format, and its ultimate size must be validated after transformation.
* **Objective**: Develop a Binary Classification Model that predicts a sample's Hazard Status (Safe vs. Unsafe) based on its chemical profile.
* **Benchmark:** We will use a **Simple Logistic Regression Classifier** as our benchmark to test the foundational strength of the chemical features. We will aim for an $\text{F1}$-score exceeding $0.75$.
* **Data Origin:** The data comes from OpenML (ID: 46085) and consists of multiple environmental parameters recorded across various sites and years.


## Dataset
- Dataset Name: Water_Quality  (Water quality measurements from various sites)
- Source: OpenML
    - LINK: https://www.openml.org/search?type=data&status=active&id=46085&sort=runs 
- Size: 1.26M instances x 25 features
- Missing values: 10.22 M
- Format: CSV 

- Attribute Description:
    - Sample ID: Unique identifier for each sample (e.g., 58086).
    - Grab ID: Identifier for the specific collection instance, with some entries missing.
    - Profile ID: Unique profile number associated with each sample site (e.g., 46937).
    - Sample Number: A distinct code for each sample, combining letters and numbers (e.g., 'L47270-122').
    - Collect DateTime: Date and time when the sample was collected, in MM/DD/YYYY HH:MM:SS AM/PM format.
    - Depth (m): Depth at which the sample was collected, in meters (e.g., 1.0).
    - Site Type: Classification of the water body from which the sample was taken (e.g., Large Lakes).
    - Area: Geographic location or name of the water body (e.g., Central Puget Sound).
    - Locator: A unique code for the site's location (e.g., KTHA03).
    - Site: Detailed description of the sample location (e.g., Lake Sammamish near Issaquah Creek).
    - Parameter: The water quality parameter measured (e.g., Fecal Coliform).
    - Value: The measured value for the parameter, with some missing entries.
    - Units: Measurement units for the parameter values (e.g., umhos/cm).
    - QualityId: A numerical value indicating the quality of the data (e.g., 2).
    - Lab Qualifier, MDL, RDL, Text Value, Sample Info, Steward Note, Replicates, Replicate Of, Method, Date Analyzed, Data Source: These fields contain additional information about the laboratory procedures, data quality analysis methods, and sources.


## Methodology
1. Data Preprocessing
- Clean and format timestamp data.
- Extract temporal features (hour, day, month, weekend, seasonality).
- Filter and group by offense type.  
2. Exploratory Data Analysis (EDA)
- Visualize time-series trends for each offense.
- Identify recurring time-based patterns (hourly, daily, weekly).
- Analyze correlations between time of offense and contextual features.

3. Modeling Approaches
- Baseline: Frequency-based prediction using moving averages or histograms of previous occurrences.

- Machine Learning:
    - Time-series forecasting models such as ARIMA, Prophet, or LSTM neural networks.
    - Compare models based on accuracy in predicting next occurrence times.

**Evaluation Metrics:** Mean Absolute Error (MAE), RMSE, and classification accuracy for predicted time bins.

## Teaming Strategy
Who does what? When and how often do you meet? 

### Role Assignments and Commitment Matrix


| Role  | Teammate    | Responsibility | Commitment (Hours/week) |
| :---: | :---------: | :--------: | :--------: |
| A     | Aleena      | Cleaning, handling missing values, parsing timestamp fields, transforming long → wide format, feature engineering | 8 hrs |
| B     | JD | Implement baseline logistic regression, build gradient boosting model, tune hyperparameters, evaluate performance | 8 hrs |
| C     | Nathaly     | Summary stats, histograms, correlation heatmaps, boxplots, missing data visualizations, interpretation of patterns | 8 hrs |


- Project assignments and completion plan.  

| Week  |   Tasks    | Deliverables |
| :---: | :--------: | :--------: |
| Week 1 |Data cleaning, exploration of dataset structure|Clean dataset + First graphs|
| Week 2 |Do full EDA (time, location, type analysis)|EDA notebook with visualizations|
| Week 3 |Build and test ML models|Model results and error metrics|
| Week 4 |Finalize dashboard and report|Dashboard + presentation slides|

- Collaboration tools and how you will ensure success.  
  * Github: Code and version control
  * Discord, Teams group chat: Team communication
  * Weekly check-ins: Progress reviews and reassigning tasks if needed.

## Mitigation Plan
- What will be the data/task/method alternative?  
  * *Data is too messy or small:* We will switch up our backup dataset. This dataset would already be known as clean and large enough.
  * *Model is too slow or hard to train:* We will simplify our approach and instead of the complicated model, we'll use a more efficient but still great alternative.

- What if a teammate is MIA?  
  * *Communication check:* If a teammate hasn't responded to our message in 48 hours during a critical phase of the project, we'll first check in with them personally.
  * *Work reassignment:* If this teammate keeps on being absent, the remaining team members will split the tasks of the missing teammate.


- What if your baseline is GIGO? 
    * Re-examine data preprocessing for missing or erroneous timestamps.
    * Implement stronger feature selection and normalization steps.*
    * Use resampling and data augmentation to improve input quality.
    * Fall back to simpler, interpretable statistical models to ensure valid results.


