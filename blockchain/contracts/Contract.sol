// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
contract Secreacy{
    struct Note{
        string tag;
        string description;
        string file;
    }
    mapping(address => Note[]) public userNotes;
    function createNote(string memory _tag,string memory _description,string memory _file)public{
        userNotes[msg.sender].push(Note(_tag,_description,_file));
    }
     function get() public view returns(Note [] memory){
        return userNotes[msg.sender];
    }
}