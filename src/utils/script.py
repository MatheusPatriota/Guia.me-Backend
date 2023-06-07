import json
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np
import sys

def load_data_from_js(file_path):
    with open(file_path, 'r', encoding='utf-8') as file:
        data = file.read()
    # Removendo a declaração "var data =" do início do arquivo .js
    data = data.replace('var data = ', '')
    # Analisando o conteúdo JSON
    data = json.loads(data)
    return data

data = load_data_from_js('src\dataset\dados_empresas.json')
lista = []

for empresa in data:
    company_name = empresa["company_name"]
    company_launch_year = empresa["company_launch_year"]
    company_logo_url = empresa["company_logo_url"]
    technology_areas = empresa["technology_areas"]
    technology_list = list(technology_areas.keys())
    technology_list.extend([technology.split(":")[0].strip() for technologies in technology_areas.values() for technology in technologies])
    for tecnologia in empresa["company_main_technologies"]:
        technology_list.append(tecnologia)
    technology_list = ", ".join(technology_list)
    company_market_area = empresa["company_market_area"]
    company_main_technologies = empresa["company_main_technologies"]
    company_positive_points = empresa["employee_reviews"]["company_positive_points"]
    company_negative_points = empresa["employee_reviews"]["company_negative_points"]
    lista.append([company_name, company_launch_year, company_logo_url, technology_list, company_market_area ,company_positive_points, company_negative_points])
    
df = pd.DataFrame(lista, columns=["Company_Name", "Company_Launch_Year", "Company_Logo_URL", "Technology_Areas", "company_market_area", "company_positive_points", "company_negative_points"])
df['Company_Name'] = df['Company_Name'].str.lower()
df['Technology_Areas'] = df['Technology_Areas'].str.lower()
df['company_market_area'] = df['company_market_area'].str.lower()
df['company_positive_points'] = df['company_positive_points'].str.lower()
df['company_negative_points'] = df['company_negative_points'].str.lower()

item_profiles = {}

for index, row in df.iterrows():
    company_name = row['Company_Name']
    Technology_Areas = row['Technology_Areas']
    company_market_area = row['company_market_area']
    company_positive_points = row['company_positive_points']
    company_negative_points = row['company_negative_points']
    
    # Concatenando as informações em um único perfil
    item_profile = f'{company_name} {Technology_Areas} {company_market_area} {company_positive_points} {company_negative_points}'
    
    # Armazenando o perfil do item
    item_profiles[index] = item_profile

user_id = 1
user_profile = {}
user_profile['company_market_area'] = sys.argv[1]
user_profile['company_main_technologies'] = sys.argv[2]

# Cálculo da similaridade
tfidf = TfidfVectorizer(stop_words='english')
item_tfidf_matrix = tfidf.fit_transform(item_profiles.values())
user_tfidf_matrix = tfidf.transform(user_profile.values())
cosine_sim = cosine_similarity(item_tfidf_matrix, user_tfidf_matrix)

soma = np.sum(cosine_sim, axis=1)
resultado = np.array(soma)
indices_recomendacoes = np.argsort(-resultado, axis=0)[:5]
indices_recomendacoes

recomendacoes = []
for indice in indices_recomendacoes:

    # Obter os dados do item recomendado
    item_recomendado = data[indice]

    # Adicionar a recomendação à lista de recomendações
    recomendacoes.append(item_recomendado)

recomendacoes = json.dumps(recomendacoes)
print(recomendacoes)