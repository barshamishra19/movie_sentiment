# Sentiment Analysis with IMDB Dataset 🎥✨📊

This repository presents a sentiment analysis system leveraging the IMDB Dataset of 50,000 movie reviews. The project trains a machine learning model to classify movie reviews as positive or negative based on their textual content. Additionally, it offers an interactive application enabling users to input reviews and receive sentiment predictions. This document details the dataset, methodology, and implementation. 🌟

## Table of Contents 📚🗂️📋

1. [Dataset Overview](#dataset-overview)
2. [Code Overview](#code-overview)
   - [Library Imports](#library-imports)
   - [Dataset Loading](#dataset-loading)
   - [Text Preprocessing](#text-preprocessing)
   - [Data Splitting](#data-splitting)
   - [Feature Engineering](#feature-engineering)
   - [Model Training](#model-training)
   - [Evaluation Metrics](#evaluation-metrics)
   - [Interactive Predictions](#interactive-predictions)
3. [Saved Artifacts](#saved-artifacts)
4. [Execution Instructions](#execution-instructions)
5. [Potential Enhancements](#potential-enhancements)

---

## Dataset Overview 🎬📊💡

The dataset utilized is the **IMDB Dataset of 50,000 Movie Reviews**, a well-established benchmark in natural language processing tasks. Each review is annotated with a sentiment label: "positive" or "negative."

- **Features**:
  - `review`: Textual data containing user-generated movie reviews.
  - `sentiment`: Binary labels indicating sentiment polarity.

This dataset is ideal for exploring sentiment analysis due to its diversity and balanced representation of sentiments. 🌈

---

## Code Overview 🛠️📜🧩

### Library Imports 🐍📦📘

The project employs the following Python libraries:

- **pandas**: Facilitates data manipulation and inspection.
- **nltk**: Aids in natural language preprocessing, such as tokenization and stopword removal.
- **re**: Handles text cleaning, e.g., stripping HTML tags and punctuation.
- **scikit-learn**: Powers machine learning tasks like train-test splitting, feature extraction, and evaluation.
- **joblib**: Manages serialization of trained models and associated artifacts. 💾

### Dataset Loading 📂🖥️✅

The IMDB dataset is loaded using pandas, ensuring compatibility for downstream preprocessing and analysis:

```python
file_path = '/kaggle/input/imdb-dataset-of-50k-movie-reviews/IMDB Dataset.csv'
data = pd.read_csv(file_path)
```

The dataset's integrity is verified using functions like `.head()` and `.info()`. 🛡️

### Text Preprocessing ✏️🧹📑

Textual data is cleaned and normalized to enhance model performance. Steps include:

1. Lowercasing all text.
2. Stripping HTML tags using regular expressions.
3. Removing punctuation and non-alphanumeric characters.
4. Tokenizing text into words.
5. Eliminating stopwords to retain meaningful terms.

Implementation:

```python
def preprocess_text(text):
    text = text.lower()
    text = re.sub(r'<.*?>', '', text)
    text = re.sub(r'[^\w\s]', '', text)
    tokens = word_tokenize(text)
    tokens = [word for word in tokens if word not in stopwords.words('english')]
    return ' '.join(tokens)

data['cleaned_review'] = data['review'].apply(preprocess_text)
```

### Data Splitting ✂️🧪🎯

The dataset is partitioned into training and testing subsets to facilitate model evaluation:

```python
from sklearn.model_selection import train_test_split

X = data['cleaned_review']
y = data['sentiment']

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
```

- \`\`: Preprocessed text data.
- \`\`: Corresponding sentiment labels.

### Feature Engineering 🛠️📈🧠

To transform textual data into numeric features, **TF-IDF Vectorization** is applied:

```python
from sklearn.feature_extraction.text import TfidfVectorizer

vectorizer = TfidfVectorizer(max_features=5000)
X_train_vec = vectorizer.fit_transform(X_train)
X_test_vec = vectorizer.transform(X_test)
```

TF-IDF (Term Frequency-Inverse Document Frequency) quantifies word importance by balancing term frequency within documents and rarity across the corpus. 📊

### Model Training 🎓📚🤖

The sentiment classification model employs **Multinomial Naive Bayes**, a robust algorithm for text-based predictions:

```python
from sklearn.naive_bayes import MultinomialNB

model = MultinomialNB()
model.fit(X_train_vec, y_train)
```

Multinomial Naive Bayes is computationally efficient and effective for high-dimensional datasets like text. 🚀

### Evaluation Metrics 📈📊✅

The model's performance is evaluated through:

- **Accuracy**: Measures the proportion of correctly classified samples.
- **Classification Report**: Provides precision, recall, and F1-score for each class.

```python
from sklearn.metrics import accuracy_score, classification_report

y_pred = model.predict(X_test_vec)
accuracy = accuracy_score(y_test, y_pred)
print(f"Accuracy: {accuracy:.2f}")
print("Classification Report:\n", classification_report(y_test, y_pred))
```

### Interactive Predictions 🤔📢🔮

A user-friendly function facilitates sentiment prediction for custom input reviews:

```python
def predict_sentiment():
    while True:
        user_input = input("Enter a movie review (or type 'exit' to quit): ")
        if user_input.lower() == 'exit':
            break
        cleaned_input = preprocess_text(user_input)
        input_vec = vectorizer.transform([cleaned_input])
        prediction = model.predict(input_vec)
        print(f"Predicted Sentiment: {prediction[0].capitalize()}\n")
```

---

## Saved Artifacts 💾📥📦

The trained model and vectorizer are serialized for reuse:

```python
joblib.dump(model, 'sentiment_model.pkl')
joblib.dump(vectorizer, 'tfidf_vectorizer.pkl')
```

These artifacts streamline deployment and eliminate the need for retraining. 🛠️

---

## Execution Instructions ⚙️🚀📖

1. **Clone the Repository**: Download the project files or clone the repository.

2. **Install Dependencies**: Ensure all required libraries are installed:

   ```bash
   pip install pandas nltk scikit-learn joblib
   ```

3. **Run the Application**: Launch the interactive script:

   ```bash
   python sentiment_predictor.py
   ```

4. **Access the Web Version**: Visit the live web application at [this link](https://v0-sentiment-analysis-lbfbrbo1vhf.vercel.app/). 🌐

---

## Potential Enhancements 🌟📈🔧

1. **Advanced Algorithms**:

   - Explore alternative models like Support Vector Machines or Logistic Regression.
   - Integrate deep learning frameworks (e.g., LSTM, BERT).

2. **Preprocessing Refinements**:

   - Implement stemming or lemmatization to improve text normalization.

3. **Interface Improvements**:

   - Enhance the web application's UI for a more intuitive user experience.

4. **Language Diversity**:

   - Extend the system to handle multilingual datasets. 🌍

