setCurPList({
    id:'humans_as_gods',
    name: 'Люди как боги',
    author: 'Сергей Снегов',
    note:'1 Галактическая разведка <br>2 Вторжение в Персей <br>3 Кольцо обратного времени',
    list: function(){
        l=[];

        for(i=0; i<=67; i++){
            if (i<10){
                is='000'+i;
            }else{
                is='00'+i;
            }
            l.push({id:i, name:'Track '+i, src:'https://ia801902.us.archive.org/17/items/bookaudiocom4265_1675289/'+is+'.mp3'})
        }
        return l;            
    }()
});