pragma solidity ^0.4.9;

contract Conference {

    struct PersonStruct {
        //bytes32 hkey;
        string key;
        bool exists;
        string name;
    }

    struct MeetingStruct {
        uint256  id;
        bytes32 room;
        string  note;
        //mapping (bytes32 => PersonStruct) PersonsMap ;
        mapping (string => PersonStruct) PersonsMap ;
    }


    //-----------------------
    bytes32[] Meetings;
    mapping (bytes32 => MeetingStruct) MeetingsMap ;

    address  Owner ;

    //only owner can execute the methods
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
    function CheckPerson( bytes32 room_, string key_ ) public constant returns (bool) {
        bool rs = false;
        string memory v = "";

        if( MeetingsMap[room_].id > 0 ) {
            rs = MeetingsMap[room_].PersonsMap[key_].exists;
        }

        return( rs );
    }

    function AddPerson( bytes32 room_, string key_, string name_ ) public {

        if( MeetingsMap[room_].id > 0 ) {
            MeetingsMap[room_].PersonsMap[key_].key = key_;
            MeetingsMap[room_].PersonsMap[key_].exists = true;
            MeetingsMap[room_].PersonsMap[key_].name = name_;
        }
    }

    function DeletePerson( bytes32 room_, string key_ ) public {
        require(MeetingsMap[room_].id > 0, "Unknown person");

        MeetingsMap[room_].PersonsMap[key_].key = "";
        MeetingsMap[room_].PersonsMap[key_].exists = false;
        MeetingsMap[room_].PersonsMap[key_].name = "";
    }
}
