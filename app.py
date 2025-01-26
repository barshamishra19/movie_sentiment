from flask import Flask, render_template, request
import pandas as pd
import re
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
import nltk
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.naive_bayes import MultinomialNB

app = Flask(__name__)

# Download NLTK data
nltk.download('stopwords')
nltk.download('punkt')

# Preprocessing function
def preprocess_text(text):
    text = text.lower()
    text = re.sub(r'<.*?>', '', text)
    text = re.sub(r'[^\w\s]', '', text)
    tokens = word_tokenize(text)
    tokens = [word for word in tokens if word not in stopwords.words('english')]
    return ' '.join(tokens)

# Load and preprocess the dataset
file_path = 'IMDB Dataset.csv'  # Make sure this file is in the same directory as app.py
data = pd.read_csv(file_path)
data['cleaned_review'] = data['review'].apply(preprocess_text)

# Split data and train the model
X = data['cleaned_review']
y = data['sentiment']
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

vectorizer = TfidfVectorizer(max_features=5000)
X_train_vec = vectorizer.fit_transform(X_train)

model = MultinomialNB()
model.fit(X_train_vec, y_train)

@app.route('/', methods=['GET', 'POST'])
def index():
    sentiment = None
    if request.method == 'POST':
        review = request.form['review']
        cleaned_review = preprocess_text(review)
        vectorized_review = vectorizer.transform([cleaned_review])
        sentiment = model.predict(vectorized_review)[0]
    return render_template('index.html', sentiment=sentiment)

if __name__ == '__main__':
    app.run(debug=True)

