from datetime import datetime
class MPF:
    def __init__(self, inAsset, outAsset, date):
        self.inAsset = inAsset;
        self.outAsset = outAsset;
        self.months = self.computeMonthNum(date);
    
    def computeMonthNum(self, date):
        currentDate = datetime.strptime(date, '%d-%m');
        monthNum = 12 - currentDate.month;
        if currentDate.day == 1:
            monthNum += 1;
        return monthNum;

    def getAmountIn(self):
        return self.inAsset * self.months;

    def getAmountOut(self):
        return self.outAsset * self.months;
    
    def toString(self):
        return f"Ввод: {self.inAsset}\t Вывод: {self.outAsset}\t Месяцы: {self.months},";