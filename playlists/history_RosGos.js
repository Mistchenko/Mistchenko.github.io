setCurPList({
    id:'HistoryRussia_Akunin',
    name: 'История Российского государства',
    author: 'Акунин',
    list: function(){
        l=[];

        for(i=1; i<=50; i++){
            if (i<10){
                is='0'+i;
            }else{
                is=''+i;
            }
            l.push({id:i, name:'Track '+i, src:'http://ia601002.us.archive.org/19/items/Istorija_rossijskogo_gosudarstva/'+is+'.mp3'})
        }
        return l;            
    }()
});