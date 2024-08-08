/**
 * Member response.
 */
function MemberResponse(member) {
  return {
    message: "Successfully Store Member",
    member: {
      id: member.id,
      code: member.code,
      name: member.name,
    },
  };
}

module.exports = MemberResponse;
