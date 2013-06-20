var day="";
var month="";
var myweekday="";
var year="";
var timerID = null;
var timerRunning = false;
var dayf="";
var sal="";
var roozf="";
var mahf="";

mydate = new Date();
myday = mydate.getDay();
mymonth = mydate.getMonth();
myweekday= mydate.getDate();
weekday= myweekday;
myyear= mydate.getFullYear();
year = myyear;

if(myday == 0)
{
day = " Sunday, ";
dayf= "يكشنبه";
}
else if(myday == 1)
{
day = " Monday, ";
dayf="دوشنبه";
}
else if(myday == 2)
{
day = " Tuesday, ";
dayf="سه شنبه";
}
else if(myday == 3)
{
day = " Wednesday, ";
dayf="چهارشنبه";
}
else if(myday == 4)
{
day = " Thurday, ";
dayf="پنجشنبه";
}
else if(myday == 5)
{
day = " Friday, ";
dayf="جمعه";
}
else if(myday == 6)
{
day = " Saturday, ";
dayf="شنبه";
}

if ( ((mymonth>=0)&& (mymonth <= 1)) || ((mymonth == 2) && (myweekday <= 20)))
{
   sal = myyear - 622;
   s1 = true;
}
else
{
   sal = myyear - 621;
   s1 = false;
}


if ((myyear%4 == 0) && (myyear%400 != 0))
kabise = true;
else
kabise=false;

if (((myyear - 1) % 4 == 0) && ((myyear - 1)%400 != 0))
kabiseold = true;
else kabiseold=false;

if (myyear == 2000)
   kabise = true;
   
if (myyear == 2001)
   kabiseold = true;


shamsi=new Array(12);
shamsi[0] = 0;
shamsi[1] = 31;
shamsi[2] = 62;
shamsi[3] = 93;
shamsi[4] = 124;
shamsi[5] = 155;
shamsi[6] = 186;
shamsi[7] = 216;
shamsi[8] = 246;
shamsi[9] = 276;
shamsi[10] = 306;
shamsi[11] = 336;

if (kabise)
   kab = 1;
else
   kab = 0;


miladi=new Array(12);
miladi[0] = 0;
miladi[1] = 31 + kab;
miladi[2] = 59 + kab;
miladi[3] = 90 + kab;
miladi[4] = 120 + kab;
miladi[5] = 151 + kab;
miladi[6] = 181 + kab;
miladi[7] = 212 + kab;
miladi[8] = 243 + kab;
miladi[9] = 273 + kab;
miladi[10] = 304 + kab;
miladi[11] = 334 + kab;

marray=new Array(12);
marray[0] = "فروردين";
marray[1] = "ارديبهشت";
marray[2] = "خرداد";
marray[3] = "تير";
marray[4] = "مرداد";
marray[5] = "شهريور";
marray[6] = "مهر";
marray[7] = "آبان";
marray[8] = "آذر";
marray[9] = "دي";
marray[10] = "بهمن";
marray[11] = "اسفند";

if (kabiseold)
   kab1 = 1;
else
   kab1 = 0;

if (s1)
   x1 = myweekday + miladi[mymonth] + kab1;
else
   x1 = myweekday + miladi[mymonth];

if (x1< 80)
x1 = 365 - 79 + x1;
   else if (x1> 80)
        x1 = x1 - 79;
   else if (x1=80)
        {
        if(s1)
           x1 = 365 - 79 + x1;
        else
           x1 = x1 - 79;
        }

ss1 = true;
i = 12;
while (i > 0 && ss1)
{
   i = i - 1;
   if (x1 <= shamsi[i])
     ss1=true;
   else ss1=false;  
}

rooz=new Array(31);
rooz[0] = "يكم";
rooz[1] = "دوم";
rooz[2] = "سوم";
rooz[3] = "چهارم";
rooz[4] = "پنجم";
rooz[5] = "ششم";
rooz[6] = "هفتم";
rooz[7] = "هشتم";
rooz[8] = "نهم";
rooz[9] = "دهم";
rooz[10] = "يازدهم";
rooz[11] = "دوازدهم";
rooz[12] = "سيزدهم";
rooz[13] = "چهاردهم";
rooz[14] = "پانزدهم";
rooz[15] = "شانزدهم";
rooz[16] = "هفدهم";
rooz[17] = "هجدهم";
rooz[18] = "نوزدهم";
rooz[19] = "بيستم";
rooz[20] = "بيست و يكم";
rooz[21] = "بيست و دوم";
rooz[22] = "بيست و سوم";
rooz[23] = "بيست و چهارم";
rooz[24] = "بيست و پنجم";
rooz[25] = "بيست و ششم";
rooz[26] = "بيست و هفتم";
rooz[27] = "بيست و هشتم";
rooz[28] = "بيست و نهم";
rooz[29] = "سي ام";
rooz[30] = "سي و يكم";
roozf=rooz[x1 - shamsi[i]-1];
mahf=marray[i];
if(mymonth == 0) {
month = "January ";}
else if(mymonth ==1)
month = "February ";
else if(mymonth ==2)
month = "March ";
else if(mymonth ==3)
month = "April ";
else if(mymonth ==4)
month = "May ";
else if(mymonth ==5)
month = "June ";
else if(mymonth ==6)
month = "July ";
else if(mymonth ==7)
month = "August ";
else if(mymonth ==8)
month = "September ";
else if(mymonth ==9)
month = "October ";
else if(mymonth ==10)
month = "November ";
else if(mymonth ==11)
month = "December ";
