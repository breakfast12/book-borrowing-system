/**
 * Member Detail response.
 */
function MemberDetailResponse(member) {
  return {
    message: "Successfully Show Detail Member",
    member: {
      id: member.id,
      code: member.code,
      name: member.name,
    },
  };
}

module.exports = MemberDetailResponse;
