# Project Report & Presentation Submission Guide

## 1. Title & Team Information
**Project Title:** Water Quality Hazard Classification and Attribute Analysis

**Team Members:**
* **Nathaly Ingol** (qhd10) - EDA Analyst & Visualization Lead
* **Aleena Tomy** (zdh39) - Modeling Lead & Hyperparameter Tuning
* **JD Escobedo** (dxh19) - Data Engineer & Git Manager

## 2. Abstract
Addressing the critical public safety need for rapid water toxicity detection, this project develops a Machine Learning classifier to predict "Hazardous" water samples (Fecal Coliform > 200 counts) based on chemical profiles. **Directly addressing instructor feedback to minimize False Negatives**, we transitioned from a linear Logistic Regression baseline to a non-linear XGBoost architecture. We overcame significant data challenges, transforming the OpenML dataset from a sparse long-format (1.26M rows) into a structured wide-format (51k samples). While the baseline model achieved high accuracy but failed to detect 59% of hazards (Recall: 0.41), our final Optimized XGBoost model—tuned via Precision-Recall thresholding—increased Recall to **0.70**. This improvement successfully balances the minimization of missed hazards with operational viability, identifying **Total Phosphorus, Enterococcus, and Total Suspended Solids** as the primary scientific drivers of water toxicity.

## 3. Problem Statement
**Scope & Importance:**
Biological testing for water safety takes 24–48 hours to return results. Our goal is to build a binary classification model that predicts hazards *instantly* using real-time chemical markers, preventing public exposure during that testing window.

**Evolution of Task:**
Our understanding of the problem evolved significantly during the data engineering phase. We initially underestimated the complexity of the raw data structure, which existed in a "Long Format" (one row per single measurement). This required a complex pivoting strategy to align time-series data into usable feature vectors. Furthermore, our focus shifted from pure "Accuracy" to **Recall Maximization**, realizing that in a public safety context, a False Negative (missing a toxic event) is far costlier than a False Positive (a false alarm).

## 4. Dataset Exploration
**Dataset Description:**
* **Source:** OpenML Water Quality Dataset (ID: 46085).
* **Structure:** Originally 1.26 million rows (long-format). Pivoted to **51,279 unique water samples** with 48 chemical features.
* **Imbalance:** The dataset has a positivity rate of **22.4%** (Hazardous) vs. 77.6% (Safe). This is a moderate imbalance that required stratified sampling.

**Key EDA Observations:**
* **Distribution Skew:** The target variable (`Fecal Coliform`) and key predictors like `Turbidity` followed a heavy right-skewed distribution. We addressed this via Log-Transformation (`np.log1p`) to normalize inputs.
* **Seasonality:** Time-series visualization revealed distinct pollution spikes during summer months. This insight guided us to abandon linear month integers (1–12) in favor of **Cyclical Feature Encoding** (Sine/Cosine) to preserve the temporal proximity of December to January.
* **Correlations:** The correlation heatmap highlighted strong multicollinearity ($R > 0.95$) between Nitrite and Nitrate. These redundant features were flagged for regularization handling.

**Insights Guiding Modeling:**
The EDA revealed that the relationship between chemical interactions (e.g., pH impacting toxicity only at high temperatures) is non-linear. This suggested that tree-based ensemble methods (XGBoost) would outperform linear baselines.

## 5. Methodology

### Baseline Approach
* **Model:** Logistic Regression with `class_weight='balanced'` and L2 regularization ($C=10$).
* **Implementation:** We standardized all features using `StandardScaler` to account for unit differences (e.g., Temperature vs. Nitrogen levels).
* **Results:** The baseline achieved 84% Accuracy but failed dangerously on safety. The **Recall was only 0.41**, meaning it missed 1,376 hazardous samples out of 2,349. This confirmed that linear boundaries are insufficient for biological toxicity classification.

### Improved Methods
**1. Advanced Feature Engineering:**
* **Cyclical Time Features:** We mapped `Month` and `Hour` to 2D coordinates using sine/cosine transformations to capture seasonal cycles accurately.
* **Median Imputation:** To handle sparsity created by the pivot, we used Median Imputation, which is robust to the outliers identified in EDA.

**2. Model Architecture: XGBoost Classifier**
We selected Gradient Boosting (XGBoost) to capture non-linear feature interactions and handle missing values natively.
* **Addressing False Negatives:** We implemented the professor's feedback by calculating a dynamic `scale_pos_weight` (~3.49). This forced the model to penalize missing a hazard ~3.5x more than a false alarm.
* **Threshold Tuning:** The weighted model was too aggressive (high Recall, low Precision). We performed a sensitivity analysis using the **Precision-Recall Curve**, adjusting the decision threshold from 0.50 to **0.65**. This created a "Goldilocks" model that maximized safety without overwhelming the system with false alarms.

## 6. Experimental Results and Comparative Analysis

**Model Performance Summary:**
We successfully raised the primary metric (Recall) by **70%** relative to the baseline.

| Metric | Baseline (LogReg) | Weighted XGBoost | **Final Optimized XGBoost** |
| :--- | :--- | :--- | :--- |
| **Recall (Safety)** | 0.41 | 0.84 | **0.70** |
| **Precision** | 0.81 | 0.57 | **0.70** |
| **F1-Score** | 0.55 | 0.68 | **0.70** |
| **False Negatives** | 1,376 (High Risk) | 385 (Best Safety) | **700 (Balanced)** |

**Scientific Drivers of Toxicity (Feature Importance):**
Using XGBoost Feature Importance, we identified the top chemical drivers of hazard predictions. This validates the model's scientific accuracy:
1.  **Total Phosphorus (0.2757):** The strongest predictor, likely due to agricultural runoff fueling bacterial growth.
2.  **Enterococcus (0.1300):** A direct biological indicator strongly correlated with Fecal Coliform.
3.  **Total Suspended Solids (0.1013):** Indicates water clarity and particulate matter where bacteria attach.
4.  **E. coli (0.0793):** A direct measure of fecal contamination.

## 7. Team Contributions

| Name | Contribution | Sections Authored / Tasks Completed |
| :--- | :--- | :--- |
| **Aleena Tomy** | Implemented Baseline Logistic Regression; Developed XGBoost pipeline; Executed Threshold Tuning. | Modeling Code, Methodology, Experimental Results |
| **JD Escobedo** | Implemented Python Pivot/Merge script to solve data structure; Managed Git LFS. | Problem Statement, Methodology (Data Eng), Final Report Compilation |
| **Nathaly Ingol** | Conducted 25-column Quality Analysis; Generated Histograms and Correlation heatmaps. | Dataset Section, EDA Visualizations, Formatting |

## 8. Next Steps & Mitigation Plan
* **Current Status:** Project Complete. All milestones (Tuning, Feature Analysis, Reporting) were achieved by Dec 3rd.
* **Mitigation Strategy (Retrospective):** Our contingency plan, had the classification metrics failed, was to pivot to a **Regression Task** predicting the continuous value of `Total Nitrogen` using Ridge Regression. Since the XGBoost F1-score reached 0.70, this fallback was not required.

## 9. References & Links
1.  OpenML Dataset: *Water Quality* (ID 46085). Available at: [https://www.openml.org/search?type=data&status=active&id=46085](https://www.openml.org/search?type=data&status=active&id=46085)
2.  Scikit-Learn Documentation: *Precision-Recall Curves*.
3.  XGBoost Documentation: *Scale_Pos_Weight for Imbalanced Classification*.

## 10. Submission Checklist
- [x] Expanded project proposal with feedback integrated
- [x] EDA with visual and statistical findings (Grouped by insight)
- [x] Baseline and improved methods/results (Logical progression shown)
- [x] Team contributions table
- [x] Future/mitigation plans
- [x] Slides, code (`.ipynb`), and PDF ready for upload