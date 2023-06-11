import requests
from bs4 import BeautifulSoup
import json
import sys

def search_jobs(query):
    url = f"https://www.glassdoor.com/Job/jobs.htm?sc.keyword={query}"
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3"
    }

    response = requests.get(url, headers=headers)
    soup = BeautifulSoup(response.content, "html.parser")

    jobs = soup.find_all("li", class_="react-job-listing")
    results = []

    for job in jobs:
        
        title_element = job.find("div", class_="job-title")
        if title_element:
            title = title_element.text.strip()
        else:
            title = "N/A"

        company_element = job.find("div", class_="ml-xsm job-search-1bgdn7m")
        if company_element:
            company = company_element.contents[0]
        else:
            company = "N/A"

        location_element = job.find("div", class_="location")
        if location_element:
            location = location_element.text.strip()
        else:
            location = "N/A"

        salary_element = job.find("div", class_="salary-estimate")
        if salary_element:
            salary = salary_element.text.strip()
        else:
            salary = "Not specified"

        job_link = job.find("a", class_="jobCard")
        if job_link:
            link = job_link.get("href")
        else:
            link = "N/A"
            
        if link != "N/A":
            link = f"https://www.glassdoor.com{link}"
            response = requests.get(link, headers=headers)
            soup = BeautifulSoup(response.content, "html.parser")
            
            description_element = soup.find("div", class_="desc")
            if description_element:
                description = str(description_element)
            else:
                description = "N/A"

        result = {
            "Title": title,
            "Company": company,
            "Location": location,
            "Salary": salary,
            "Description": description,
            "link": link
        }
        
        results.append(result)
        if len(results) == 5:
            break

    json_results = json.dumps(results)
    return json_results

print(search_jobs(sys.argv[1]))