/**
 * Created by wangzhen on 2018-05-16 09:05:26.
 */
// export function toMoney(money){
//   let newMoney = money;
//   if(newMoney){
//     newMoney = newMoney.toFixed(2);
//   }else{
//     newMoney=0;
//     newMoney=newMoney.toFixed(2);
//   }
//   return newMoney;
// }

/*
 * 优化代码
 */
export function toMoney(money = 0){
  return money.toFixed(2)
}
