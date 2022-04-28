# COVID-19 健保特約機構快篩劑資訊
An application that can help you to find the rapid test kit 

## 說明
此專案以create-react-app建立專案架構的一頁式網站，透過**衛生福利部中央健康保險署**所提供的政府開放資料API[健保特約機構防疫家用快篩剩餘數量明細資料](https://data.nhi.gov.tw/Datasets/DatasetDetail.aspx?id=698)做為資料來源實作。

因API所提供的資料格式為CSV，故資料前處理先將需要的資料取出並轉換為JSON Format，以利後續使用。
透過定位設備位置，將周邊有提供Covid-19快篩試劑之健保特約機構，以距離排列並顯示前5筆資料於頁面之中。

## Demo
[COVID-19 健保特約機構快篩劑資訊](https://zhongjunjimmy.github.io/covid-19_rapid_test_kit_tw_map/)

## 參考
[How to plan and organize a React project — by building a weather app](https://konstantinmuenster.medium.com/how-to-plan-and-organize-a-react-project-by-building-a-weather-app-95175b11bd01)
