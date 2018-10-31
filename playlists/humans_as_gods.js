setCurPList({
    id:'humans_as_gods_1',
    name: 'Люди как боги',
    author: 'Сергей Снегов',
    note:'1 Галактическая разведка',
    list: function(){
        l=[];

        for(i=1; i<=15; i++){
            if (i<10){
                is='0'+i;
            }else{
                is=''+i;
            }
            l.push({id:i, name:'Track '+i, src:'https://ia800505.us.archive.org/20/items/oasolnze12_gmail_03_201505/'+is+'.mp3'})
        }
        return l;            
    }()
});