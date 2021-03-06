const ChatRoom = require('../lib/ChatRoom');

describe('ChatRoom', () => {
  
  var client1 = {};
  var client2 = {};
  var client3 = {};
  let chatroom = null;
  
  beforeEach(() => {
    chatroom = new ChatRoom();
    chatroom.add(client1);
    chatroom.add(client2);
    chatroom.add(client3);
  });

  it('can add a client', () => {
    chatroom.add({ username: 'Drew' }, (err, createdClient) => {
      expect(err).toBeFalsy;
      expect(createdClient).toEqual({ username: 'Drew' });
    });
  });

  it('returns the user based on username', () => {
    client1 = chatroom.add({});
    const returnedClient = chatroom.getClient(client1.username);
    expect(returnedClient).toEqual(client1);
  });

  it('renames a user', () => {
    const client = {};
    chatroom.add(client);
    const OriginalName = client.username;
    expect(chatroom.rename(client.username, 'username')).toBeTruthy(); 
    expect(client.username).toEqual('username4');
    expect(chatroom.getClient(OriginalName)).toBeFalsy();
  });

  it('can not rename to existing user name', () => {
    const chatroom = new ChatRoom();
    client1 = chatroom.add({});
    client2 = chatroom.add({});
    chatroom.rename(client1.username, client2.username);
    expect(client1.username).not.toEqual(client2.username);
  });
  
  it('returns an array of all clients', () => {
    const chatroom = new ChatRoom();
    client1 = chatroom.add({});
    client2 = chatroom.add({});
    const allClients = chatroom.all();
    expect(allClients).toEqual([client1, client2]);
  });
});
