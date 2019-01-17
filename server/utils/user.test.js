const expect = require('expect');

const {Users} = require('./user');

describe('Users', ()=>{
    var users;
    beforeEach(()=>{
        users = new Users();
        users.users = [{
            id: '1',
            name: 'mike',
            room: 'Node Course'
        },{
            id: '2',
            name: 'Jen',
            room: 'React Course'
        },{
            id: '3',
            name: 'julie',
            room: 'Node Course'
        }]
    });

    it('should add new user', ()=>{
        var users = new Users();
        var user = {
            id: '123',
            name: 'Calvin',
            room: 'The office frds'
        };
        var resUser = users.addUser(user.id, user.name, user.room);
        expect(users.users).toEqual([user]);

    }
    );
    it('should return names for node course', ()=>{
        var userList = users.getUserList('Node Course');

        expect(userList).toEqual(['mike', 'julie']);
    });

    it('should find user', ()=>{
        var userId = '2';
        var user = users.getUser(userId);

        expect(user.id).toBe(userId);
    })
    it('should not find user', ()=>{
        var userId = '99';
        var user = users.getUser(userId);

        expect(user).toNotExist();
    })
});
