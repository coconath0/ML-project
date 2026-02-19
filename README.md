# Water Quality Hazard Classification and Attribute Analysis (OpenML ID: 46085)

## Abstract
This project addresses the critical public safety need for rapid water toxicity detection by developing a Machine Learning classifier to predict "Hazardous" water samples based on chemical profiles. The primary goal was to build a binary classification model that predicts hazards instantly using real-time chemical markers, preventing public exposure during the standard 24-48 hour biological testing window.

Directly addressing requirements to minimize False Negatives, our team transitioned from a linear Logistic Regression baseline to a non-linear XGBoost architecture. We overcame significant data challenges by transforming an OpenML dataset from a sparse "Long Format" of 1.26M rows into a structured wide-format of 51k samples. While the baseline model failed to detect 59% of hazards (Recall: 0.41), our final Optimized XGBoost model—tuned via Precision-Recall thresholding—increased Recall to 0.70. This improvement successfully balances hazard detection with operational viability, identifying Total Phosphorus, Enterococcus, and Total Suspended Solids as the primary scientific drivers of water toxicity.

## Experimental Results and Comparative Analysis

### Model Performance Summary
We successfully raised the primary safety metric (Recall) by 70% relative to the baseline. The transition to XGBoost drastically reduced the "False Negative" count, directly addressing the core safety objective of minimizing missed hazards.

| Metric | Baseline (LogReg) | Weighted XGBoost | Final Optimized XGBoost |
| :--- | :--- | :--- | :--- |
| **Recall (Safety)** | 0.41 | 0.84 | 0.70 |
| **Precision** | 0.81 | 0.57 | 0.70 |
| **F1-Score** | 0.55 | 0.68 | 0.70 |
| **False Negatives** | 1,376 (High Risk) | 385 (Best Safety) | 700 (Balanced) |



### Scientific Drivers of Toxicity
Using XGBoost Feature Importance, we identified the top chemical drivers for hazard predictions, validating the model’s scientific accuracy:

* **Total Phosphorus (0.2757):** The strongest predictor, likely due to agricultural runoff fueling bacterial growth.
* **Enterococcus (0.1300):** A direct biological indicator strongly correlated with Fecal Coliform.
* **Total Suspended Solids (0.1013):** Indicates water clarity and particulate matter where bacteria attach.
* **E. coli (0.0793):** A direct measure of fecal contamination.
* **Hour_cos (0.0729):** Captured via cyclical time feature engineering to identify temporal toxicity patterns.

