pragma solidity ^0.4.9;

contract Conference {

    struct PersonStruct {
        bytes32 hkey;
        string name;
    }

    struct MeetingStruct {
        uint256  id;
        bytes32 room;
        string  note;
        mapping (bytes32 => PersonStruct) PersonsMap ;
    }

    bytes32[] Meetings;
    mapping (bytes32 => MeetingStruct) MeetingsMap ;

    address  Owner ;
    //uint256  Count ;


    modifier onlyOwner {
        require(msg.sender == Owner, "Sender not authorized.");
        _;
    }

    constructor() public {
        Owner = msg.sender;
    }

    function GetMeetings() public constant returns (uint256, bytes32[])
    {
       return( Meetings.length, Meetings ) ;
    }

    function GetMeeting( bytes32 room_ ) public constant returns (uint256, bytes32, string) {
        return( MeetingsMap[room_].id, MeetingsMap[room_].room, MeetingsMap[room_].note) ;
    }

    function AddMeeting( bytes32 room_, string note_ ) onlyOwner public returns (uint256) {
        require(MeetingsMap[room_].id == 0, "Room already exists");
        //if( MeetingsMap[room_].id > 0 ) throw;

        Meetings.push(room_) ;
        MeetingsMap[room_] = MeetingStruct({ id: Meetings.length, room: room_, note: note_ });

        return( Meetings.length );
    }

    function DeleteMeeting( bytes32 room_ ) onlyOwner public returns (uint256) {
        require(MeetingsMap[room_].id > 0, "Unknown room");

        uint256 id = MeetingsMap[room_].id;
        bytes32 room = Meetings[Meetings.length - 1];
        Meetings[id] = room;
        MeetingsMap[room_].id =  id;
        Meetings.length--;

        return (id);
    }

    //-------------------------------------------------------------------
    function CheckPerson( bytes32 room_, bytes32 key_ ) public constant returns (bool) {
        bool rs = false;
        bytes32 k = sha256(key_);

        if( MeetingsMap[room_].id > 0 ) {
            if( MeetingsMap[room_].PersonsMap[k].hkey > 0 ) {
                rs = true;
            }
        }

        return( rs );
    }

    function AddPerson( bytes32 room_, bytes32 key_, string name_ ) public {

        bytes32 k = sha256(key_);

        if( MeetingsMap[room_].id > 0 ) {
            MeetingsMap[room_].PersonsMap[k].hkey = k;
            MeetingsMap[room_].PersonsMap[k].name = name_;
        }
    }

    function DeletePerson( bytes32 room_, bytes32 key_ ) public {
        require(MeetingsMap[room_].id > 0, "Unknown person");
        //if( MeetingsMap[room_].id == 0 ) throw;

        bytes32 k = sha256(key_);

        MeetingsMap[room_].PersonsMap[k].hkey = 0;
        MeetingsMap[room_].PersonsMap[k].name = "";
    }
}
