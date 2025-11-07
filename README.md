# Project Proposal Title: 
*Analyzing and Predicting 911 Calls for Service in Austin (2019–2024)*

## Teammates
- Nathaly Ingol - qhd10
- Aleena Tomy - zdh39
- JD (John) Escobedo - dxh19

## Project Abstract
Our project aims to predict when the next occurrence of a specific offense type will happen using historical crime data from the City of Austin. By analyzing the timestamps and categories of various offenses, we plan to model temporal crime trends and forecast the most likely future time for a given offense. This prediction can help law enforcement agencies better allocate resources and anticipate peak crime periods. We will leverage time-series forecasting and machine learning methods to analyze periodicity, seasonality, and correlation patterns within offense data.

## Problem Statement
Criminal offenses often follow recurring temporal patterns, like certain crimes spike at particular times of day, days of the week, or seasons. However, identifying and forecasting these trends is challenging due to the complex, noisy nature of real-world data.

Our objective is to develop a model that, given an offense type (e.g., theft, assault), predicts the next likely time that offense will occur. The model will be trained on historical timestamps and designed to learn cyclical temporal behaviors (daily, weekly, or seasonal).

We will compare different offenses against themselves to identify which exhibit stronger periodic predictability and determine the model’s effectiveness across offense categories.

## Dataset
- Dataset Name: APD 911 Calls for Service 2019-2024
- Source: City of Austin Open Data Portal
    - https://data.austintexas.gov/Public-Safety/APD-911-Calls-for-Service-2019-2024/e687-fx2y/about_data
- Size: 1.83M rows x 25 col
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


