// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;
contract Secreacy{
    struct Note{
        string tag;
        string description;
        string file;
        uint index;
    }
    mapping(address => Note[]) public userNotes;
    function createNote(string memory _tag,string memory _description,string memory _file)public{
         uint lastIndex = userNotes[msg.sender].length;
        userNotes[msg.sender].push(Note(_tag,_description,_file,lastIndex));
    }
     function get() public view returns(Note [] memory){
        return userNotes[msg.sender];
    }

     function deleteNote(uint index) public returns(Note [] memory){
         delete userNotes[msg.sender][index];
        return userNotes[msg.sender];
    }

    function updateNote(uint index,string memory _tag,string memory _description,string memory _file)public returns(Note memory){
        userNotes[msg.sender][index].tag = _tag; 
        userNotes[msg.sender][index].description = _description; 
        userNotes[msg.sender][index].file = _file; 
        return userNotes[msg.sender][index];
    }

}
