# Project Proposal Title: 
*Water Quality Hazard Classification and Attribute Analysis*

## Teammates
- Nathaly Ingol - qhd10
- Aleena Tomy - zdh39
- JD (John) Escobedo - dxh19

## Project Abstract
This project aims to develop a machine learning model to **classify water samples** by their probability of exceeding pollution thresholds, identifying potential environmental hazards. We will use the **Water Quality (46085)** dataset, which requires a critical **data transformation (pivoting)** from long to wide format. By analyzing chemical parameters (Fecal Coliform, Nitrogen, etc.) and temporal/location features, we plan to train a **Gradient Boosting Classifier** to predict future hazard status. This analysis will help identify the **most relevant chemical indicators** driving poor water quality.

## Problem Statement
Water quality monitoring often involves slow, expensive lab tests, and identifying which sites are becoming polluted is challenging due to the large number of parameters. Our objective is to develop a **Classification Model** that can accurately predict if a water sample (based on its chemical fingerprint and location) will exceed critical health/environmental thresholds.

* **Problem:** The raw data is in a complex **long format** and its ultimate size must be validated after transformation.
* **Objective:** Develop a **Binary Classification Model** that predicts a sample's **Hazard Status** (Safe vs. Unsafe) based on its chemical profile.
* **Benchmark:** We will use a **Simple Logistic Regression Classifier** as our benchmark to test the foundational strength of the chemical features. We will aim for an $\text{F1}$-score exceeding $0.75$.
* **Data Origin:** The data comes from **OpenML (ID: 46085)** and consists of multiple environmental parameters recorded across various sites and years.


## Dataset
- Dataset Name: Water_Quality  (Water quality measurements from various sites)
- Source: OpenML
    - LINK: https://www.openml.org/search?type=data&status=active&id=46085&sort=runs 
- Size: 12.59M instances x 25 features
- Format: CSV 

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


| Role  | Teammate    | Responsibility | Commitment |
| :---: | :---------: | :--------: | :--------: |
| A     | Aleena      |            |            |
| B     | JD Escobedo |            |            |
| C     | Nathaly     |            |            |


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
* Implement stronger feature selection and normalization steps.
* Use resampling and data augmentation to improve input quality.
* Fall back to simpler, interpretable statistical models to ensure valid results.


